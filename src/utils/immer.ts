import { produce, setAutoFreeze } from 'immer'

export function produceWithImmer<T>(base: T, producer: (state: T) => void) {
  setAutoFreeze(false)
  return produce(base, producer) as T
}
