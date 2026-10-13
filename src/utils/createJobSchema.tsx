import { z } from 'zod';

export const createJobSchema = z.object({
  title: z.string().min(10, "Tiêu đề quá ngắn").max(120, "Tiêu đề quá dài"),
  position: z.string().min(2, "Vui lòng nhập vị trí chuyên môn"),
  quantity: z.coerce.number().min(1, "Số lượng ít nhất là 1"),
  location: z.string().min(5, "Vui lòng nhập địa điểm làm việc"),
  
  jobDescription: z.string().min(50, "Mô tả công việc cần chi tiết hơn"),
  jobRequirements: z.string().min(50, "Yêu cầu công việc cần chi tiết hơn"),
  jobBenefits: z.string().optional(),
  
  categoryId: z.number().nullable().optional(), 
  applicationDeadline: z.string().min(1, "Vui lòng chọn hạn ứng tuyển"),
  
  employmentType: z.string(),
  workMode: z.string(),
  salaryRange: z.string(),
  experienceRequired: z.string(),
  educationRequired: z.string(),
  
  requiredSkillIds: z.array(z.number()).default([])
});

// Dòng này xuất cái Type ra để các file Component mang về dùng
export type CreateJobFormValues = z.infer<typeof createJobSchema>;