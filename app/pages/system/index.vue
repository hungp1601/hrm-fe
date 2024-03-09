<template>
  <div class="system-page w-full">
    <div
      class="system-page__header flex flex-row justify-between flex-wrap w-full items-center gap-3"
    >
      <div class="system-page__header-left headline-20 text-black">
        Phân quyền
      </div>
      <div class="system-page__header-right">
        <RightPermissionBar
          @search-user="handleSearchUser"
          @add-user="handleAddUser"
        />
      </div>
    </div>
    <div
      v-loading="loading"
      class="system-page__content w-full bg-white px-3"
      :style="{
        'max-width': width,
      }"
    >
      <EmptyUserPermission v-if="!users.length" @add-user="handleAddUser" />
      <div v-else>
        <UserPermissionTable
          :users="users"
          @edit="handleEditUser"
          @delete="handleDeleteUser"
        />
        <el-pagination
          class="mt-2"
          :current-page="pagination.page"
          :page-size="pagination.page_size"
          background
          layout="total, ->, prev, pager, next"
          :total="pagination.total"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getService, SERVICE_NAMES } from '@/api'
import { getQueryParams, changeQueryParams } from '@/utils'

definePageMeta({
  layout: 'system',
})

const { isDesktop } = useAwesomeScreen() || { isDesktop: false }

const isOpen = reactive(isDesktop)
const loading = ref(true) // Add a loading state variable
const users = ref([])
const filters = ref({})
const pagination = ref({ page: 1, page_size: 15, total: 0 })

const width = computed(() =>
  isOpen.value ? 'calc(100vw - 256px)' : 'calc(100vw - 112px)',
)

const fetchData = async () => {
  try {
    loading.value = true
    const { page, page_size } = getQueryParams()
    pagination.value = {
      ...pagination.value,
      page: page || pagination.value.page,
      page_size: page_size || pagination.value.page_size,
    }

    filters.value = {
      ...filters.value,
      limit: pagination.value.page_size,
      page: pagination.value.page,
    }

    const { data } = await getService(SERVICE_NAMES.User).getList(filters.value)
    const { items, total } = data
    pagination.value.total = total
    changeQueryParams({
      page: pagination.value.page,
      page_size: pagination.value.page_size,
    })
    users.value = items
  } catch (error) {
  } finally {
    loading.value = false // Set loading to false after the API call is complete
  }
}

fetchData()

const handleAddUser = () => {
  console.log('handleAddUser')
}

const handleEditUser = (id: number) => {
  console.log('handleEditUser', id)
}

const handleDeleteUser = (id: number) => {
  console.log('handleDeleteUser', id)
}

const handleSearchUser = (value: string) => {
  filters.value = {
    ...filters.value,
    or_: [
      {
        field: 'username',
        condition: 'cont',
        value,
      },
      {
        field: 'email',
        condition: 'cont',
        value,
      },
      {
        field: 'full_name',
        condition: 'cont',
        value,
      },
    ],
  }
  fetchData()
}

const handlePageChange = (page: number) => {
  changeQueryParams({ ...getQueryParams(), page })
  fetchData()
}
</script>

<style lang="scss" scoped>
.system-page {
  padding: 0 24px 8px 24px;
  background: #f2f4f7;
  &__header {
    min-height: 56px;
  }

  &__content {
    height: calc(100vh - 112px);
  }
}
</style>
