export async function preloadVoices() {

  return new Promise(resolve => {
    const voices = window.speechSynthesis.getVoices()
    if (voices.length > 0) {
      resolve(voices)
      return
    }

    window.speechSynthesis.onvoiceschanged = () => {
      resolve(window.speechSynthesis.getVoices())
    }
  
    setTimeout(() => resolve([]), 2000)
  })
}

export function getPreferredVoice() {
  const voices = window.speechSynthesis.getVoices()
  if (voices.length === 0) return null


  const preferredNames = [
    'Google हिन्दी', 
    'Microsoft Heera - English (India)',
    'Microsoft Ravi - English (India)',
    'Google UK English Male',
    'Google UK English Male',
    'Microsoft George - English (United Kingdom)',
    'Microsoft David - English (United States)',
    'Microsoft Mark - English (United States)',
    'Google US English',
    'Alex',                        
    'Daniel',                     
  ]

  for (const name of preferredNames) {
    const match = voices.find(v => v.name === name)
    if (match) return match
  }

 
  return (
    voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('male')) ||
    voices.find(v => v.lang.startsWith('en')) ||
    voices[0]
  )
}

export function speak(text, onStart, onEnd) {
 
  window.speechSynthesis.cancel()

  if (!text || text.trim().length === 0) {
    onEnd?.()
    return null
  }

  const utterance = new SpeechSynthesisUtterance(text)
  const voice = getPreferredVoice()
  if (voice) utterance.voice = voice

  utterance.rate   = 0.92   
  utterance.pitch  = 1.0
  utterance.volume = 1.0
  utterance.lang   = 'en-IN' 

  utterance.onstart = () => onStart?.()
  utterance.onend   = () => onEnd?.()
  utterance.onerror = () => onEnd?.() 

  window.speechSynthesis.speak(utterance)
  return utterance
}

export function stopSpeaking() {
  window.speechSynthesis.cancel()
}
