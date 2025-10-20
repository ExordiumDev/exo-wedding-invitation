// composables/useWheelNavigation.js
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isNavigating = ref(false)

export function useWheelNavigation({ nextRoute, delay = 800 }) {
    const router = useRouter()

    const handleWheel = (e) => {
        if (isNavigating.value) return

        if (e.deltaY > 0) {
            e.preventDefault()
            isNavigating.value = true
            router.push({ name: nextRoute })

            setTimeout(() => {
                isNavigating.value = false
            }, delay)
        }
    }

    const handleTouch = (() => {
        let startY = 0
        return {
            start(e) {
                startY = e.touches[0].clientY
            },
            move(e) {
                if (isNavigating.value) return
                const diffY = e.touches[0].clientY - startY
                if (diffY < -50) {
                    e.preventDefault()
                    isNavigating.value = true
                    router.push({ name: nextRoute })
                    setTimeout(() => {
                        isNavigating.value = false
                    }, delay)
                }
            }
        }
    })()

    const attach = (el) => {
        el.addEventListener('wheel', handleWheel, { passive: false })
        el.addEventListener('touchstart', handleTouch.start, { passive: false })
        el.addEventListener('touchmove', handleTouch.move, { passive: false })
    }

    const detach = (el) => {
        el.removeEventListener('wheel', handleWheel)
        el.removeEventListener('touchstart', handleTouch.start)
        el.removeEventListener('touchmove', handleTouch.move)
    }

    return { attach, detach }
}
