import type { FormInstance } from 'element-plus'

export const useFormHandler = () => {
  const validateForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return false
    await formEl.validate((valid) => {
      return valid
    })
  }

  return {
    validateForm,
  }
}
