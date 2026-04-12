<template>
    <div class="toast-container">
        <TransitionGroup name="toast-list">
            <ToastMessage 
                v-for="toast in toasts" 
                :key="toast.id" 
                :toast="toast" 
                @close="removeToast" 
            />
        </TransitionGroup>
    </div>
</template>

<script setup>
import ToastMessage from './ToastMessage.vue';
import { useToast } from '../composables/useToast';

const { toasts, removeToast } = useToast();
</script>
