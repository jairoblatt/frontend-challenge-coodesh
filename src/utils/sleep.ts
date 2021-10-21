export function sleep(milliseconds?: number) {
  return new Promise<void>((resolve) => {
    setTimeout((): void => resolve(), milliseconds || 1);
  });
}
