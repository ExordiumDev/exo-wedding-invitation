import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isNavigating = ref(false)

export function useWheelNavigation({ nextRoute, prevRoute, delay = 800 }) {
    const router = useRouter()

    const navigate = (direction) => {
        if (isNavigating.value) return
        isNavigating.value = true

        const targetRoute = direction === 'next' ? nextRoute : prevRoute
        if (!targetRoute) {
            isNavigating.value = false
            return
        }

        router.push({ name: targetRoute })

        // lock scroll selama delay
        setTimeout(() => {
            isNavigating.value = false
        }, delay)
    }

    const handleWheel = (e) => {
        if (isNavigating.value) return

        if (e.deltaY > 0 && nextRoute) {
            e.preventDefault()
            navigate('next')
        } else if (e.deltaY < 0 && prevRoute) {
            e.preventDefault()
            navigate('prev')
        }
    }

    // mobile swipe gesture
    const handleTouch = (() => {
        let startY = 0
        return {
            start(e) {
                startY = e.touches[0].clientY
            },
            move(e) {
                if (isNavigating.value) return
                const diffY = e.touches[0].clientY - startY

                if (diffY < -50 && nextRoute) {
                    // swipe up → next
                    e.preventDefault()
                    navigate('next')
                } else if (diffY > 50 && prevRoute) {
                    // swipe down → prev
                    e.preventDefault()
                    navigate('prev')
                }
            }
        }
    })()

    const attach = (el) => {
        if (!el) return
        el.addEventListener('wheel', handleWheel, { passive: false })
        el.addEventListener('touchstart', handleTouch.start, { passive: false })
        el.addEventListener('touchmove', handleTouch.move, { passive: false })
    }

    const detach = (el) => {
        if (!el) return
        el.removeEventListener('wheel', handleWheel)
        el.removeEventListener('touchstart', handleTouch.start)
        el.removeEventListener('touchmove', handleTouch.move)
    }

    return { attach, detach }
}
