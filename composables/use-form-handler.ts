import type { FormInstance } from 'element-plus'

export const useFormHandler = () => {
  const validateForm = async (formEl: FormInstance | undefined) => {
    let ans = false
    if (!formEl) return false
    await formEl.validate((valid) => {
      ans = valid
    })
    return ans
  }

  return {
    validateForm,
  }
}
