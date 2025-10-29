// import mongoose from 'mongoose';

// const districtPerformanceSchema = new mongoose.Schema({
//   district_code: {
//     type: String,
//     required: true,
//     index: true,
//   },
//   district_name: {
//     type: String,
//     required: true,
//     index: true,
//   },
//   state_name: {
//     type: String,
//     required: true,
//     index: true,
//   },
//   meta: {
//     fin_year: String,
//     month: String,
//     state_code: String,
//     api_district_code: String,
//   },
//   performance_data: {
//     total_workers: Number,
//     active_workers: Number,
//     total_households_worked: Number,
//     total_individuals_worked: Number,
//     job_cards_issued: Number,
//     active_job_cards: Number,
//     avg_days_employment: Number,
//     avg_wage_rate: Number,
//     completed_100_days: Number,
//     approved_labour_budget: Number,
//     total_wages: Number,
//     material_skilled_wages: Number,
//     total_expenditure: Number,
//     admin_expenditure: Number,
//     total_works_taken_up: Number,
//     completed_works: Number,
//     ongoing_works: Number,
//     gps_with_nil_exp: Number,
//     women_participation_days: Number,
//     sc_participation_days: Number,
//     sc_workers_count: Number,
//     st_participation_days: Number,
//     st_workers_count: Number,
//     differently_abled: Number,
//     payment_within_15_days: Number,
//     category_b_works_percent: Number,
//     agriculture_allied_percent: Number,
//     nrm_expenditure_percent: Number,
//     central_liability_persondays: Number,
//     remarks: String,
//   },
//   statistics: {
//     total_people_employed: Number,
//     total_households: Number,
//     women_percentage: String,
//     sc_percentage: String,
//     st_percentage: String,
//   },
//   created_at: {
//     type: Date,
//     default: Date.now,
//     index: true,
//   },
//   expires_at: {
//     type: Date,
//     default: () => new Date(Date.now() + 3600000), // 1 hour
//     index: true,
//   },
// });

// // Compound index for faster lookups
// districtPerformanceSchema.index({ district_name: 1, state_name: 1 });

// // TTL index - automatically delete documents after expires_at
// districtPerformanceSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

// export interface DistrictPerformance {
//   district_code: string;
//   district_name: string;
//   state_name: string;
//   meta: {
//     fin_year: string;
//     month: string;
//     state_code: string;
//     api_district_code: string;
//   };
//   performance_data: any;
//   statistics: any;
//   created_at: Date;
//   expires_at: Date;
// }

// export const DistrictPerformance = mongoose.models.DistrictPerformance || 
//   mongoose.model<DistrictPerformance>('DistrictPerformance', districtPerformanceSchema);

import mongoose from 'mongoose';

const districtPerformanceSchema = new mongoose.Schema({
  district_code: {
    type: String,
    required: true,
    index: true,
  },
  district_name: {
    type: String,
    required: true,
    index: true,
  },
  state_name: {
    type: String,
    required: true,
    index: true,
  },
  meta: {
    fin_year: String,
    month: String,
    state_code: String,
    api_district_code: String,
    timestamp: String,
  },
  performance_data: {
    total_workers: Number,
    active_workers: Number,
    total_households_worked: Number,
    total_individuals_worked: Number,
    job_cards_issued: Number,
    active_job_cards: Number,
    avg_days_employment: Number,
    avg_wage_rate: Number,
    completed_100_days: Number,
    approved_labour_budget: Number,
    total_wages: Number,
    material_skilled_wages: Number,
    total_expenditure: Number,
    admin_expenditure: Number,
    total_works_taken_up: Number,
    completed_works: Number,
    ongoing_works: Number,
    gps_with_nil_exp: Number,
    women_participation_days: Number,
    sc_participation_days: Number,
    sc_workers_count: Number,
    st_participation_days: Number,
    st_workers_count: Number,
    differently_abled: Number,
    payment_within_15_days: Number,
    category_b_works_percent: Number,
    agriculture_allied_percent: Number,
    nrm_expenditure_percent: Number,
    central_liability_persondays: Number,
    remarks: String,
  },
  statistics: {
    total_people_employed: Number,
    total_households: Number,
    women_percentage: String,
    sc_percentage: String,
    st_percentage: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
    index: true,
  },
  expires_at: {
    type: Date,
    default: () => new Date(Date.now() + 3600000), // 1 hour
    index: true,
  },
});

// ✅ UNIQUE COMPOUND INDEX - Prevents duplicates!
districtPerformanceSchema.index(
  { district_name: 1, state_name: 1 }, 
  { unique: true }
);

// TTL index - automatically delete documents after expires_at
districtPerformanceSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

export interface DistrictPerformance {
  district_code: string;
  district_name: string;
  state_name: string;
  meta: {
    fin_year: string;
    month: string;
    state_code: string;
    api_district_code: string;
    timestamp: string;
  };
  performance_data: any;
  statistics: any;
  created_at: Date;
  expires_at: Date;
}

export const DistrictPerformance = mongoose.models.DistrictPerformance || 
  mongoose.model<DistrictPerformance>('DistrictPerformance', districtPerformanceSchema);