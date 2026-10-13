import { z } from 'zod';

export const createJobSchema = z
  .object({
    title: z.string().min(10, 'Tiêu đề quá ngắn').max(120, 'Tiêu đề quá dài'),
    position: z.string().min(2, 'Vui lòng nhập vị trí chuyên môn'),
    quantity: z.coerce.number().min(1, 'Số lượng ít nhất là 1').max(99, 'Số lượng tối đa là 99'),
    location: z.string().min(5, 'Vui lòng nhập địa điểm làm việc'),

    jobDescription: z.string().min(50, 'Mô tả công việc cần chi tiết hơn'),
    jobRequirements: z.string().min(50, 'Yêu cầu công việc cần chi tiết hơn'),
    jobBenefits: z.string().optional(),

    categoryId: z.number().nullable().optional(),
    applicationDeadline: z.string().min(1, 'Vui lòng chọn hạn ứng tuyển'),

    employmentType: z.string().min(1),
    workMode: z.string().min(1),
    salaryMin: z.number().min(0, 'Lương tối thiểu không được âm').max(300, 'Mức lương tối đa là 300 triệu/tháng').nullable(),
    salaryMax: z.number().min(0, 'Lương tối đa không được âm').max(300, 'Mức lương tối đa là 300 triệu/tháng').nullable(),
    isSalaryNegotiable: z.boolean(),
    experienceRequired: z.string(),
    educationRequired: z.string(),

    requiredSkillIds: z.array(z.number()).default([]),
  })
  .superRefine((values, context) => {
    if (values.categoryId == null || values.categoryId <= 0) {
      context.addIssue({
        code: 'custom',
        path: ['categoryId'],
        message: 'Vui lòng chọn danh mục tuyển dụng',
      });
    }

    if (values.isSalaryNegotiable) return;

    if (values.salaryMin === null) {
      context.addIssue({
        code: 'custom',
        path: ['salaryMin'],
        message: 'Nhập mức lương tối thiểu hoặc chọn thỏa thuận',
      });
    }

    if (values.salaryMax === null) {
      context.addIssue({
        code: 'custom',
        path: ['salaryMax'],
        message: 'Nhập mức lương tối đa hoặc chọn thỏa thuận',
      });
    }

    if (
      values.salaryMin !== null &&
      values.salaryMax !== null &&
      values.salaryMin > values.salaryMax
    ) {
      context.addIssue({
        code: 'custom',
        path: ['salaryMax'],
        message: 'Mức lương tối đa phải lớn hơn hoặc bằng mức tối thiểu',
      });
    }
  });

export type CreateJobFormValues = z.infer<typeof createJobSchema>;
