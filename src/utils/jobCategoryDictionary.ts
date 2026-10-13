export type JobCategoryOption = {
  id: number;
  name: string;
  slug: string;
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/đ/g, 'd')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const rules: Array<{ slug: string; keywords: string[] }> = [
  {
    slug: 'cong-nghe-thong-tin',
    keywords: [
      'software qa engineer', 'qa engineer', 'software tester',
      'automation tester', 'manual tester', 'backend', 'frontend',
      'fullstack', 'developer', 'lap trinh vien', 'kiem thu phan mem',
      'devops', 'data engineer', 'it support', 'quan tri he thong',
    ],
  },
  {
    slug: 'tai-chinh-ke-toan',
    keywords: [
      'ke toan', 'accountant', 'kiem toan', 'auditor',
      'tai chinh', 'ngan hang', 'tin dung', 'thue',
    ],
  },
  {
    slug: 'kinh-doanh-ban-hang',
    keywords: [
      'sales', 'kinh doanh', 'ban hang', 'business development',
      'tu van ban hang', 'telesales', 'account executive',
    ],
  },
  {
    slug: 'marketing-truyen-thong',
    keywords: [
      'marketing', 'content', 'seo', 'social media',
      'truyen thong', 'quang cao', 'branding', 'performance',
    ],
  },
  {
    slug: 'nhan-su-hanh-chinh',
    keywords: [
      'nhan su', 'tuyen dung', 'recruiter', 'human resources',
      'hanh chinh', 'office admin', 'hr',
    ],
  },
  {
    slug: 'cham-soc-khach-hang',
    keywords: [
      'customer service', 'cham soc khach hang', 'tong dai vien',
      'call center', 'customer success',
    ],
  },
  {
    slug: 'van-hanh-logistics',
    keywords: [
      'logistics', 'supply chain', 'kho van', 'giao nhan',
      'xuat nhap khau', 'dieu phoi van tai', 'mua hang',
    ],
  },
  {
    slug: 'ky-thuat-san-xuat',
    keywords: [
      'qa qc', 'quality control', 'kiem soat chat luong',
      'san xuat', 'nha may', 'co khi', 'bao tri',
      'dien cong nghiep', 'ky thuat vien', 'tu dong hoa',
    ],
  },
  {
    slug: 'thiet-ke-sang-tao',
    keywords: [
      'ui ux', 'graphic designer', 'designer', 'thiet ke',
      'illustrator', 'video editor', 'dung phim',
    ],
  },
  {
    slug: 'giao-duc-dao-tao',
    keywords: [
      'giao vien', 'giang vien', 'dao tao', 'teacher',
      'trainer', 'tutor', 'tu van tuyen sinh',
    ],
  },
  {
    slug: 'y-te-duoc',
    keywords: [
      'bac si', 'y ta', 'dieu duong', 'duoc si',
      'pharmacist', 'y te', 'medical',
    ],
  },
  {
    slug: 'xay-dung-bat-dong-san',
    keywords: [
      'xay dung', 'construction', 'kien truc su',
      'civil engineer', 'giam sat cong trinh', 'bat dong san',
    ],
  },
  {
    slug: 'nha-hang-khach-san-dich-vu',
    keywords: [
      'nha hang', 'khach san', 'dau bep', 'phuc vu',
      'le tan', 'hospitality', 'du lich',
    ],
  },
  {
    slug: 'phap-ly-tuan-thu',
    keywords: [
      'luat su', 'phap che', 'legal', 'compliance',
      'tuan thu', 'chuyen vien phap ly',
    ],
  },
];

export function suggestJobCategory(
  position: string,
  categories: JobCategoryOption[],
): JobCategoryOption | null {
  const text = normalize(position);
  if (!text) return null;

  const matchedRule = rules.find((rule) =>
    rule.keywords.some((keyword) => text.includes(normalize(keyword))),
  );

  if (!matchedRule) return null;

  return categories.find(
    (category) => category.slug === matchedRule.slug,
  ) ?? null;
}