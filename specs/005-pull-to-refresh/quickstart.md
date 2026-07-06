# Phase 1: Quickstart

## How to use `usePullToRefresh`

To integrate pull-to-refresh into a view, use the new wrapper component or composable directly.

### Example using a Wrapper Component

```vue
<template>
  <PullToRefresh :onRefresh="handleRefresh">
    <!-- Your main content here (lists, dashboard, etc.) -->
    <div class="content">
       <div v-for="item in items" :key="item.id">{{ item.name }}</div>
    </div>
  </PullToRefresh>
</template>

<script setup>
import PullToRefresh from '@/components/PullToRefresh.vue'
import { ref } from 'vue'

const items = ref([])

const handleRefresh = async (done) => {
  try {
    // Fetch data from cloud
    await fetchCloudData()
  } catch (error) {
    // Handle error (show toast)
    console.error(error)
  } finally {
    // Signal completion
    done()
  }
}
</script>
```
