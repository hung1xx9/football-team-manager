<template>
  <nav class="bottom-nav">
    <!-- Dashboard -->
    <router-link to="/dashboard" class="nav-item" active-class="active">
      <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
      <span>Home</span>
    </router-link>

    <!-- Matches -->
    <router-link v-if="permissions.canViewMatches" to="/matches" class="nav-item" active-class="active">
      <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2 L12 22" />
        <path d="M2 12 L22 12" />
      </svg>
      <span>Trận Đấu</span>
    </router-link>

    <!-- Quick Attendance (For Members/Guests) -->
    <router-link v-if="permissions.canViewAttendance" to="/attendance" class="nav-item" active-class="active">
      <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>Quét QR</span>
    </router-link>

    <!-- Finance -->
    <router-link v-if="permissions.canViewFinance" to="/finance" class="nav-item" active-class="active">
      <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
      <span>Quỹ/Phạt</span>
    </router-link>

    <!-- My Payments (For Guests) -->
    <router-link v-else-if="permissions.canViewMyPayments" to="/my-payments" class="nav-item" active-class="active">
      <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 6v6l4 2"></path>
      </svg>
      <span>Nợ Quỹ</span>
    </router-link>

    <!-- More / Menu -->
    <button class="nav-item menu-trigger" @click="$emit('toggle-menu')">
      <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
      <span>Menu</span>
    </button>
  </nav>
</template>

<script setup>
import { useAuth } from '../composables/useAuth';

const { permissions } = useAuth();
defineEmits(['toggle-menu']);
</script>

<style scoped>
.bottom-nav {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: var(--bg-elevated);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid var(--border-color);
  z-index: 1000;
  padding: 0 10px;
  box-shadow: var(--shadow-lg);
  justify-content: space-around;
  align-items: center;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 10px;
  gap: 4px;
  flex: 1;
  height: 100%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.nav-item:active {
  transform: scale(0.92);
  opacity: 0.7;
}

.nav-icon {
  width: 22px;
  height: 22px;
  stroke-width: 2;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.active {
  color: var(--primary-600);
}

.active .nav-icon {
  transform: translateY(-4px);
  filter: drop-shadow(0 4px 8px rgba(37, 99, 235, 0.3));
  stroke-width: 2.5;
}

.active span {
  font-weight: 700;
  transform: translateY(-2px);
}

.menu-trigger {
  color: var(--text-secondary);
}

.menu-trigger:active .nav-icon {
  transform: rotate(90deg) scale(1.1);
}

@media (max-width: 768px) {
  .bottom-nav {
    display: flex;
  }
}
</style>
