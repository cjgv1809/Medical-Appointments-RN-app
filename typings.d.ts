interface Patient {
  id: string;
  name: string;
  owner: string;
  email: string;
  phone?: string;
  date: Date;
  symptoms: string;
}
