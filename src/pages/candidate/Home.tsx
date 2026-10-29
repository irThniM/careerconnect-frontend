import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchJobs, type JobSearchResponse } from '../../api/jobs';
import { apiFetch } from '../../api/client';
import { isAuthenticatedAs } from '../../utils/auth';
import CandidateHomeSidebar from '../../components/candidate/home/CandidateHomeSidebar';
import CandidateJobSearch from '../../components/candidate/home/CandidateJobSearch';
import CandidateQuickLinks from '../../components/candidate/home/CandidateQuickLinks';
import CandidateWelcomePanel from '../../components/candidate/home/CandidateWelcomePanel';
import HiringEmployersSection from '../../components/candidate/home/HiringEmployersSection';
import OpenJobsSection from '../../components/candidate/home/OpenJobsSection';
import { getProfileCompletion, type CandidateProfileSummary, type EmployerHighlight, type HomeJobsState } from '../../components/candidate/home/homeTypes';

const emptyJobs: JobSearchResponse = { items: [], page: 1, pageSize: 6, totalCount: 0 };

const Home: React.FC = () => {
  const location = useLocation();
  const successKey = location.state?.loginSuccess ? location.key : null;
  const [dismissedToastKey, setDismissedToastKey] = useState<string | null>(null);
  const [jobsState, setJobsState] = useState<HomeJobsState>({ ready: false, data: emptyJobs, error: '' });
  const [profile, setProfile] = useState<CandidateProfileSummary | null>(null);
  const [profileReady, setProfileReady] = useState(false);
  const [profileError, setProfileError] = useState(false);
  const signedInCandidate = isAuthenticatedAs('Candidate');
  const fullName = profile?.fullName || localStorage.getItem('fullName') || '';
  const showToast = successKey !== null && dismissedToastKey !== successKey;

  useEffect(() => {
    let active = true;
    searchJobs({ page: 1, pageSize: 6 })
      .then((data) => { if (active) setJobsState({ ready: true, data, error: '' }); })
      .catch((error: unknown) => { if (active) setJobsState({ ready: true, data: emptyJobs, error: error instanceof Error ? error.message : 'Không thể tải tin tuyển dụng.' }); });

    if (signedInCandidate) {
      apiFetch('CandidateProfile/me')
        .then(async (response) => {
          if (!response.ok) throw new Error('Không tải được hồ sơ ứng viên.');
          return await response.json() as CandidateProfileSummary;
        })
        .then((data) => { if (active && data) setProfile(data); })
        .catch(() => { if (active) setProfileError(true); })
        .finally(() => { if (active) setProfileReady(true); });
    } else {
      setProfileReady(true);
    }

    return () => { active = false; };
  }, [signedInCandidate]);

  useEffect(() => {
    if (!successKey) return;
    const timer = setTimeout(() => setDismissedToastKey(successKey), 4000);
    return () => clearTimeout(timer);
  }, [successKey]);

  const employers = useMemo<EmployerHighlight[]>(() => {
    const byName = new Map<string, EmployerHighlight>();
    jobsState.data.items.forEach((job) => {
      const item = byName.get(job.companyName);
      if (item) item.count += 1;
      else byName.set(job.companyName, { name: job.companyName, industry: job.industry, count: 1 });
    });
    return [...byName.values()].slice(0, 3);
  }, [jobsState.data.items]);

  const profileCompletion = getProfileCompletion(profile);

  return (
    <div className="flex w-full flex-col bg-[#f8f7ff]">
      {showToast && <div className="fixed right-6 top-24 z-50 flex items-center gap-3 rounded-xl bg-emerald-700 px-5 py-3 text-white shadow-xl" role="status"><span className="material-symbols-outlined">task_alt</span><div><p className="text-sm font-bold">Đăng nhập thành công!</p><p className="text-xs text-white/85">Chào mừng {fullName || 'bạn'} trở lại CareerConnect.</p></div></div>}
      <CandidateWelcomePanel signedInCandidate={signedInCandidate} fullName={fullName} isLookingForJob={profile?.isLookingForJob ?? true} profileCompletion={profileCompletion} profileReady={profileReady} profileError={profileError} jobsReady={jobsState.ready} jobsError={Boolean(jobsState.error)} publicJobCount={jobsState.data.totalCount} />
      <CandidateJobSearch />
      <section className="px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1320px] items-start gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)]">
          <div className="space-y-6">
            <OpenJobsSection state={jobsState} />
            <HiringEmployersSection employers={employers} />
            <CandidateQuickLinks signedInCandidate={signedInCandidate} />
          </div>
          <CandidateHomeSidebar signedInCandidate={signedInCandidate} profileReady={profileReady} profileError={profileError} profileCompletion={profileCompletion} professionalTitle={profile?.professionalTitle ?? null} />
        </div>
      </section>
    </div>
  );
};

export default Home;
