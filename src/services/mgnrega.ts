interface MGNREGARecord {
  fin_year: string;
  month: string;
  state_code: string;
  state_name: string;
  district_code: string;
  district_name: string;
  Approved_Labour_Budget: string;
  Average_Wage_rate_per_day_per_person: string;
  Average_days_of_employment_provided_per_Household: string;
  Differently_abled_persons_worked: string;
  Total_Households_Worked: string;
  Total_Individuals_Worked: string;
  Total_No_of_Active_Job_Cards: string;
  Total_No_of_Active_Workers: string;
  Total_No_of_HHs_completed_100_Days_of_Wage_Employment: string;
  Total_No_of_JobCards_issued: string;
  Total_No_of_Workers: string;
  Total_Exp: string;
  Wages: string;
  Women_Persondays: string;
  SC_persondays: string;
  ST_persondays: string;
  percentage_payments_gererated_within_15_days: string;
  Material_and_skilled_Wages?: string;
  Number_of_Completed_Works?: string;
  Number_of_GPs_with_NIL_exp?: string;
  Number_of_Ongoing_Works?: string;
  Persondays_of_Central_Liability_so_far?: string;
  SC_workers_against_active_workers?: string;
  ST_workers_against_active_workers?: string;
  Total_Adm_Expenditure?: string;
  Total_No_of_Works_Takenup?: string;
  percent_of_Category_B_Works?: string;
  percent_of_Expenditure_on_Agriculture_Allied_Works?: string;
  percent_of_NRM_Expenditure?: string;
  Remarks?: string;
}

interface MGNREGAResponse {
  status: string;
  total: number;
  count: number;
  limit: string;
  offset: string;
  records: MGNREGARecord[];
}

// District name mappings (your local names -> API names)
const DISTRICT_NAME_MAPPINGS: { [key: string]: string } = {
  // Karnataka
  'mangaluru': 'dakshinakannada',
  'bengaluruurban': 'bangaloreurban',
  'mysuru': 'mysore',
  
  // Add more as needed
};

class MGNREGAService {
  private resourceId = 'ee03643a-ee4c-48c2-ac30-9f2ff26ab722';
  private baseUrl = 'https://api.data.gov.in/resource/';
  private apiKey: string;
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheTimeout = 1000 * 60 * 60; // 1 hour
  private dataCache: MGNREGARecord[] | null = null;
  private dataCacheTimestamp: number = 0;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    if (!apiKey) {
      throw new Error('MGNREGA API key is required');
    }
  }

  private parseNumeric(value: string): number {
    return parseFloat(value) || 0;
  }

  private getCacheKey(endpoint: string, params: Record<string, string>): string {
    return `${endpoint}?${new URLSearchParams(params).toString()}`;
  }

  private isValidCache(cacheEntry: { timestamp: number }): boolean {
    return Date.now() - cacheEntry.timestamp < this.cacheTimeout;
  }

  private async fetchWithCache<T>(
    endpoint: string,
    params: Record<string, string>
  ): Promise<T> {
    const cacheKey = this.getCacheKey(endpoint, params);
    const cachedData = this.cache.get(cacheKey);

    if (cachedData && this.isValidCache(cachedData)) {
      return cachedData.data as T;
    }

    try {
      const url = new URL(`${this.baseUrl}${endpoint}`);
      url.searchParams.set('api-key', this.apiKey);
      url.searchParams.set('format', 'json');
      
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status !== 'ok') {
        throw new Error(`API error: ${data.message || 'Unknown error'}`);
      }

      this.cache.set(cacheKey, { data, timestamp: Date.now() });
      return data as T;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  /**
   * Fetch all data from API with caching
   */
  private async getAllData(): Promise<MGNREGARecord[]> {
    const now = Date.now();

    // Return cached data if still valid
    if (this.dataCache && (now - this.dataCacheTimestamp) < this.cacheTimeout) {
      console.log(`💾 Using cached data (${Math.round((now - this.dataCacheTimestamp) / 1000)}s old)`);
      return this.dataCache;
    }

    try {
      console.log(`📡 Fetching all MGNREGA data from API...`);

      const response = await this.fetchWithCache<MGNREGAResponse>(this.resourceId, {
        limit: '10000',
        offset: '0',
      });

      console.log(`✅ Received ${response.records.length} records from API (Total: ${response.total})`);

      if (response.records.length > 0) {
        //@ts-ignore
        const uniqueStates = [...new Set(response.records.map(r => r.state_name))];
        //@ts-ignore
        const uniqueDistricts = [...new Set(response.records.map(r => r.district_name))];
        console.log(`📊 States: ${uniqueStates.length}, Districts: ${uniqueDistricts.length}`);
      }

      this.dataCache = response.records || [];
      this.dataCacheTimestamp = now;

      return this.dataCache;
    } catch (error) {
      console.error('❌ Error fetching all data:', error);
      throw error;
    }
  }

  /**
   * Get district performance by NAME (more reliable than codes)
   */
  async getDistrictPerformanceByName(districtName: string, stateName: string): Promise<MGNREGARecord> {
    try {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`🔍 Searching for: ${districtName}, ${stateName}`);

      const allRecords = await this.getAllData();

      if (allRecords.length === 0) {
        throw new Error('No data available from API. Please check API key and try again.');
      }

      // Normalize names for comparison
      const normalizeString = (str: string) => 
        str.toLowerCase().trim().replace(/[^a-z0-9]/g, '');

      const normalizedDistrict = normalizeString(districtName);
      const normalizedState = normalizeString(stateName);

      // Check mapping first
      const mappedDistrict = DISTRICT_NAME_MAPPINGS[normalizedDistrict] || normalizedDistrict;

      console.log(`🔄 Normalized search: "${mappedDistrict}" in "${normalizedState}"`);

      // Find matching records
      let districtRecords = allRecords.filter(r => {
        const recordDistrict = normalizeString(r.district_name);
        const recordState = normalizeString(r.state_name);
        
        return (
          (recordDistrict === normalizedDistrict || 
           recordDistrict === mappedDistrict ||
           recordDistrict.includes(normalizedDistrict) ||
           normalizedDistrict.includes(recordDistrict)) &&
          (recordState === normalizedState || 
           recordState.includes(normalizedState) ||
           normalizedState.includes(recordState))
        );
      });

      if (districtRecords.length === 0) {
        console.error(`❌ No match found for "${districtName}, ${stateName}"`);
        
        // Show available districts in that state
        const stateDistricts = allRecords.filter(r => 
          normalizeString(r.state_name).includes(normalizedState)
        );
        
        if (stateDistricts.length > 0) {
          //@ts-ignore
          const uniqueDistricts = [...new Set(stateDistricts.map(r => r.district_name))];
          console.log(`\n📍 Available districts in ${stateName}:`);
          uniqueDistricts.slice(0, 20).forEach(d => console.log(`   - ${d}`));
          if (uniqueDistricts.length > 20) {
            console.log(`   ... and ${uniqueDistricts.length - 20} more`);
          }
        }

        throw new Error(`District "${districtName}" not found in "${stateName}"`);
      }

      console.log(`✅ Found ${districtRecords.length} records`);

      // Sort by latest
      districtRecords.sort((a, b) => {
        const getYear = (fy: string) => parseInt(fy.split('-')[1] || fy.split('-')[0]);
        const yearDiff = getYear(b.fin_year) - getYear(a.fin_year);
        if (yearDiff !== 0) return yearDiff;
        
        const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
        return months.indexOf(b.month) - months.indexOf(a.month);
      });

      const latest = districtRecords[0];
      console.log(`\n📍 Latest Data:`);
      console.log(`   District: ${latest.district_name} (${latest.district_code})`);
      console.log(`   State: ${latest.state_name}`);
      console.log(`   Fiscal Year: ${latest.fin_year}`);
      console.log(`   Month: ${latest.month}`);
      console.log(`${'='.repeat(60)}\n`);

      return latest;
    } catch (error) {
      console.error(`❌ Error:`, error);
      throw error;
    }
  }

  /**
   * Legacy method - use getDistrictPerformanceByName instead
   */
  async getDistrictPerformance(districtCode: string): Promise<MGNREGARecord> {
    const today = new Date();
    const fiscalYear = today.getMonth() >= 3 ? 
      `${today.getFullYear()}-${today.getFullYear() + 1}` :
      `${today.getFullYear() - 1}-${today.getFullYear()}`;

    const response = await this.fetchWithCache<MGNREGAResponse>(this.resourceId, {
      filters: `[{"column":"district_code","operator":"=","value":"${districtCode}"},{"column":"fin_year","operator":"=","value":"${fiscalYear}"}]`,
      limit: '1'
    });

    if (!response.records || response.records.length === 0) {
      throw new Error(`No data found for district code: ${districtCode}`);
    }

    return response.records[0];
  }

  async getStateDistricts(stateCode: string): Promise<string[]> {
    return this.fetchWithCache<string[]>('mgnrega-districts', {
      state_code: stateCode,
    });
  }

  async getDistrictByLocation(lat: number, lon: number): Promise<string> {
    return this.fetchWithCache<string>('reverse-geocode', {
      latitude: lat.toString(),
      longitude: lon.toString(),
    });
  }
}

export const mgnregaService = new MGNREGAService(
  process.env.DATA_GOV_API_KEY || ''
);