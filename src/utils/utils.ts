export const isMajorThan1Day = (lastTimeUpdated: string): boolean => {
  const today: Date = new Date();
  const diffTime: number = Math.abs(new Date(lastTimeUpdated).getTime() - today.getTime());
  const diffDays: number = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isUpdateNeeded: boolean = diffDays > 1;

  return isUpdateNeeded;
}

export const defaultDate = new Date('01/01/1970')
