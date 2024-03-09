<template>
  <el-table class="user-permission-table" :data="users" style="width: 100%">
    <el-table-column prop="id" label="STT" width="60" />
    <el-table-column label="Mã nhân viên" width="240">
      <template #default="scope">
        <div class="flex flex-col gap-1">
          <div>
            {{ scope.row?.full_name }}
          </div>
          <div class="body-regular-14 text-d-grey">
            Ngày tạo:
            <span class="text-l-grey">
              {{ $dayjs(scope.row?.created_at).format('DD/MM/YYYY') }}
            </span>
          </div>
          <div class="body-regular-14 text-d-grey">
            Mã NV:
            <span class="text-l-grey">
              {{ scope.row?.id }}
            </span>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="username" label="Tên đăng nhập" width="180" />
    <el-table-column prop="username" label="Chức vụ" width="180" />
    <el-table-column prop="username" label="Phòng ban" width="180" />

    <el-table-column prop="email" label="Email" width="240" />
    <el-table-column label="Trạng thái hoạt động" width="180">
      <template #default="scope">
        <active-status :status="scope.row.active_flg" />
      </template>
    </el-table-column>
    <el-table-column width="80">
      <template #default="scope">
        <div class="flex flex-row">
          <app-icon
            class="mx-2 cursor-pointer"
            name="edit"
            @click="$emit('edit', scope.row.id)"
          ></app-icon>
          <app-icon
            class="mx-2 cursor-pointer"
            name="delete"
            @click="handleDelete(scope.row.id)"
          ></app-icon>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'

const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['delete', 'edit'])

const handleDelete = (id: number) => {
  ElMessageBox.confirm(
    'Bạn có chắc chắn muốn xóa tài khoản này không?',
    'Xóa tài khoản người dùng',
    {
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    },
  ).then(() => {
    emit('delete', id)
  })
}
</script>

<style lang="scss">
.user-permission-table {
  &.el-table {
    thead {
      th {
        background-color: #e6edf9 !important ;
        color: #263238;

        /* Body/Medium/14px */
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px; /* 142.857% */
        letter-spacing: 0.1px;
      }
    }
  }
}
</style>
