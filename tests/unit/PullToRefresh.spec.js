import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import PullToRefresh from '../../src/components/PullToRefresh.vue'

describe('PullToRefresh.vue', () => {
  it('renders slot content correctly', () => {
    const wrapper = mount(PullToRefresh, {
      props: {
        onRefresh: async () => {}
      },
      slots: {
        default: '<div class="test-content">Hello</div>'
      }
    })
    
    expect(wrapper.find('.test-content').exists()).toBe(true)
    expect(wrapper.text()).toContain('Hello')
  })

  it('binds touch events to trigger refresh', async () => {
    const onRefreshMock = vi.fn().mockResolvedValue()
    
    const wrapper = mount(PullToRefresh, {
      props: {
        onRefresh: onRefreshMock
      }
    })
    
    const container = wrapper.find('div.relative')
    
    // Simulate pull to refresh
    await container.trigger('touchstart', {
      touches: [{ clientY: 100 }]
    })
    
    await container.trigger('touchmove', {
      touches: [{ clientY: 250 }] // 150px drag, 75px pull (threshold is 60)
    })
    
    await container.trigger('touchend')
    
    expect(onRefreshMock).toHaveBeenCalled()
  })
})
