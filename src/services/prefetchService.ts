import { Country } from "@/types/country.interface";
import { User } from "@/types/user.interface";

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '';
  }  
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  return 'http://localhost:3000';
};

export class MeliService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = getBaseUrl();
  }

  async getUser(): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}/lib/user.json`);
      const user: User = await response.json();
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  async getCountries(): Promise<Country[]> {
    try {
      const response = await fetch(`${this.baseUrl}/lib/countries.json`);
      const countries: Country[] = await response.json();
      return countries;
    } catch (error) {
      console.error("Error fetching countries:", error);
      throw error;
    }
  }
}

export const meliService = new MeliService();

export const service = {
  getUser: () => meliService.getUser(),
  getCountries: () => meliService.getCountries(),
};
