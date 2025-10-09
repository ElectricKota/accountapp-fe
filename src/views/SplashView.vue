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
      class="max-sm:size-28 sm:size-32 md:size-40 pl-2 object-contain opacity-0 animate-[blur-in_900ms_0ms_ease-in_forwards] text-light"
    >
      <use href="#logo-cup-solid" />
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
