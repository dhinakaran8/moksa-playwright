export function logStep(action: string, target: string) {
  const time = new Date().toLocaleTimeString();
  console.log(`[LOG ${time}] ${action}: ${target}`);
}
