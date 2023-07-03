export async function getInitialState(): Promise<{ name: string }> {
  return { name: '3d-editor' }
}

export const layout = () => {
  return {
    pure: true,
  }
}
