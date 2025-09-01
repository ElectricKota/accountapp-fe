<script setup lang="ts">

  import { PhCaretUp } from '@phosphor-icons/vue'
  import { ref, onMounted, onUnmounted } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const container = ref<HTMLElement | null>(null)
  const startY = ref(0)
  const currentY = ref(0)
  const endY = ref(0)
  const minSwipeDistance = 100 // minimální vzdálenost pro registraci swipe
  const isDragging = ref(false)
  const isAnimating = ref(false)
  const translateY = ref(0)

  // Touch eventy
  const handleTouchStart = (event: TouchEvent) => {
    if (isAnimating.value) return
    startY.value = event.touches[0].clientY
    currentY.value = startY.value
  }

  const handleTouchMove = (event: TouchEvent) => {
    if (isAnimating.value) return
    event.preventDefault()
    currentY.value = event.touches[0].clientY
    const deltaY = startY.value - currentY.value

    // Pouze pokud se táhne nahoru (deltaY > 0)
    if (deltaY > 0) {
      translateY.value = -deltaY
      updateElementPosition()
    }
  }

  const handleTouchEnd = (event: TouchEvent) => {
    if (isAnimating.value) return
    endY.value = event.changedTouches[0].clientY
    const swipeDistance = startY.value - endY.value

    handleSwipeEnd(swipeDistance)
  }

  // Mouse eventy
  const handleMouseDown = (event: MouseEvent) => {
    if (isAnimating.value) return
    isDragging.value = true
    startY.value = event.clientY
    currentY.value = startY.value
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging.value || isAnimating.value) return
    event.preventDefault()
    currentY.value = event.clientY
    const deltaY = startY.value - currentY.value

    // Pouze pokud se táhne nahoru (deltaY > 0)
    if (deltaY > 0) {
      translateY.value = -deltaY
      updateElementPosition()
    }
  }

  const handleMouseUp = (event: MouseEvent) => {
    if (!isDragging.value || isAnimating.value) return

    isDragging.value = false
    endY.value = event.clientY
    const swipeDistance = startY.value - endY.value

    handleSwipeEnd(swipeDistance)
  }

  // Keyboard eventy
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp' || event.key === 'Up') {
      event.preventDefault()
      if (!isAnimating.value) {
        animateSwipeUp(true) // Pro klávesnici vždy úspěch
      }
    }
  }

  // Aktualizace pozice elementu během tažení
  const updateElementPosition = () => {
    if (container.value) {
      container.value.style.transform = `translateY(${translateY.value}px)`
      container.value.style.transition = 'none'
    }
  }

  // Zpracování konce swipe/drag
  const handleSwipeEnd = (swipeDistance: number) => {
    if (swipeDistance >= minSwipeDistance) {
      // Úspěšný swipe - animace nahoru
      animateSwipeUp(true)
    } else {
      // Neúspěšný swipe - animace zpět dolů
      animateSwipeUp(false)
    }
  }

  // Animace swipe
  const animateSwipeUp = (success: boolean) => {
    if (!container.value) return

    isAnimating.value = true

    if (success) {
      // Animace úplného odsunutí nahoru
      container.value.style.transition = 'transform 0.4s cubic-bezier(0.11, 0, 0.5, 0)'
      container.value.style.transform = 'translateY(-100vh)'

      // Po dokončení animace - zde bude redirect
      setTimeout(() => {
        onSwipeUpComplete()
      }, 300)
    } else {
      // Animace návratu dolů
      container.value.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      container.value.style.transform = 'translateY(0px)'

      // Reset po dokončení animace
      setTimeout(() => {
        resetSwipeState()
      }, 300)
    }
  }

  // Dokončení úspěšného swipe
  const onSwipeUpComplete = () => {
    console.log('Swipe up completed! Redirecting...')
    // Zde bude později redirect
    router.push('/login')
  }

  // Reset stavu po neúspěšném swipe
  const resetSwipeState = () => {
    translateY.value = 0
    isAnimating.value = false

    if (container.value) {
      container.value.style.transition = ''
      container.value.style.transform = ''
    }
  }

  onMounted(() => {
    if (container.value) {
      // Touch eventy
      container.value.addEventListener('touchstart', handleTouchStart, { passive: false })
      container.value.addEventListener('touchmove', handleTouchMove, { passive: false })
      container.value.addEventListener('touchend', handleTouchEnd, { passive: false })

      // Mouse eventy
      container.value.addEventListener('mousedown', handleMouseDown)
      container.value.addEventListener('mousemove', handleMouseMove)
      container.value.addEventListener('mouseup', handleMouseUp)

      // Keyboard eventy (na celém dokumentu)
      document.addEventListener('keydown', handleKeyDown)

      // Zajistíme, aby container mohl přijímat focus pro keyboard eventy
      container.value.setAttribute('tabindex', '0')
      container.value.focus()
    }
  })

  onUnmounted(() => {
    if (container.value) {
      // Touch eventy
      container.value.removeEventListener('touchstart', handleTouchStart)
      container.value.removeEventListener('touchmove', handleTouchMove)
      container.value.removeEventListener('touchend', handleTouchEnd)

      // Mouse eventy
      container.value.removeEventListener('mousedown', handleMouseDown)
      container.value.removeEventListener('mousemove', handleMouseMove)
      container.value.removeEventListener('mouseup', handleMouseUp)

      // Keyboard eventy
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

</script>
<template>
  <div
    ref="container"
    class="flex flex-col gap-4 items-center justify-center h-screen bg-primary text-light"
    :class="{ 'cursor-grabbing': isDragging }"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 550.667 550.667"
      preserveAspectRatio="xMidYMid meet"
      class="max-sm:size-28 sm:size-32 md:size-40 pl-2 object-contain opacity-0 animate-[fade-in_900ms_0ms_ease-in_forwards]"
    >
      <path
        d="M316.132 30.688c-2.08-.107-5.747.441-7.554 2.192-3.822 3.704-3.603 7.285.843 13.795 2.826 4.867 3.392 9.009 3.903 14.455 1.91 13.973-3.654 24.126-11.535 35.193-17.225 24.832-19.886 34.868-17.85 52.544 1.251 6.188 4.496 28.34 19.222 25.998 7.964-2.368 8.69-6.224 3.287-17.472-7.458-15.92-1.108-33.634 11.075-50.476 35.762-49.438 4.54-75.924-1.39-76.229zM239.8 31.867c-2.08-.106-5.747.441-7.553 2.192-3.822 3.704-3.604 7.286.842 13.796 2.827 4.866 3.393 9.008 3.903 14.454 1.91 13.973-3.654 24.126-11.534 35.193-17.225 24.832-19.886 34.868-17.85 52.544 1.251 6.188 4.496 28.34 19.222 25.998 7.964-2.367 8.69-6.224 3.287-17.472-7.459-15.92-1.108-33.633 11.075-50.476 35.762-49.438 4.54-75.924-1.391-76.229zM306.159 205.5l-75.793.038-75.793.039-29.317 2.458c-65.393 5.485-95.158 12.233-105.808 23.988l-4.307 4.754v21.139c0 136.584 78.865 242.224 191.07 255.936 5.42.662 18.541.984 29.16.717l19.305-.486 15.016-2.982c46.693-9.27 86.107-32.865 116.605-69.803L395.624 430l19.62-.164c10.62-.09 20.98.668 31.063-3.14 49.86-12.965 86.243-52.758 88.959-97.297l.81-13.297-1.822-7.49c-7.858-32.287-35.246-51.063-74.568-51.122l-13.792-.022-.515-11-.516-11.003-4.068-4.115c-11.317-11.447-46.143-18.945-111.755-24.063Zm-143.006 27.023c99.622-5.156 252.407 4.843 252.407 16.518 0 6.258-68.523 14.43-140.547 16.761-43.617 1.412-44.393 1.41-93.27-.095-63.479-1.956-131.673-10.051-138.419-16.43-5.216-4.934 55.525-13.427 119.83-16.754zm286.955 52.726c2.786-.03 6.63.038 10.857.212l15.374.63 7.15 3.082c47.642 20.535 18.266 95.979-42.902 110.18-8.139 1.89-27.887 4.051-27.887 3.053 0-.257 3.138-7.562 6.974-16.232 13.581-30.698 25.917-78.556 25.917-100.547 0-.22 1.73-.347 4.517-.378zM162.861 31.981c-2.08-.106-5.747.441-7.554 2.192-3.822 3.704-3.603 7.286.842 13.796 2.827 4.866 3.393 9.008 3.904 14.455 1.91 13.972-3.654 24.125-11.535 35.192-17.225 24.832-19.886 34.869-17.85 52.544 1.251 6.189 4.496 28.34 19.222 25.998 7.964-2.367 8.69-6.224 3.287-17.472-7.458-15.92-1.108-33.633 11.075-50.476 35.762-49.438 4.54-75.924-1.391-76.229z"
        fill="white"
      />
    </svg>
    <div class="flex flex-col pb-18">
      <h1 class="x-heading logo animate-[slide-in_700ms_200ms_forwards] opacity-0">
        AccountApp
      </h1>
      <span
        class="x-link logo animate-[slide-in_400ms_550ms_forwards] opacity-0 text-light/80"
      >
        By
        <a
          href="https://michalkotek-tech.cz"
        >
          MichalKotek.tech
        </a>
        2025
      </span>
    </div>
    <div
      class="absolute bottom-5 md:bottom-10 flex flex-col items-center mt-40 animate-bounce "
      @click="onSwipeUpComplete"
    >
      <div class="flex flex-col items-center animate-[fade-in_800ms_800ms_forwards] opacity-0">
        <PhCaretUp
          weight="bold"
          class="size-8"
        >
          <animate
            attributeName="opacity"
            values="0.2;0.2;0.2;1;0.6;0.2;0.2;"
            dur="1.6s"
            repeatCount="indefinite"
          />
        </PhCaretUp>
        <PhCaretUp
          weight="bold"
          class="size-8 -mt-4.5"
        >
          <animate
            attributeName="opacity"
            values="0.2;0.2;1;0.6;0.2;0.2;0.2;"
            dur="1.6s"
            repeatCount="indefinite"
          />
        </PhCaretUp>
        <PhCaretUp
          weight="bold"
          class="size-8 -mt-4.5"
        >
          <animate
            attributeName="opacity"
            values="0.2;1;0.6;0.2;0.2;0.2;0.2;"
            dur="1.6s"
            repeatCount="indefinite"
          />
        </PhCaretUp>
        <div class="x-title font-thin text-center">
          Swipe up to<br>
          Unlock or Login
        </div>
      </div>
    </div>
  </div>
</template>
