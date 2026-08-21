export const getPatients = () => JSON.parse(localStorage.getItem('careloop_patients') || '[]');
export const savePatients = (patients: any) => localStorage.setItem('careloop_patients', JSON.stringify(patients));
export const getDoctors = () => JSON.parse(localStorage.getItem('careloop_doctors') || '[]');
export const saveDoctors = (doctors: any) => localStorage.setItem('careloop_doctors', JSON.stringify(doctors));