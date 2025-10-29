// import { NextResponse } from 'next/server';
// import mongoose from 'mongoose';
// import { DistrictPerformance } from '@/models/DistrictPerformance';
// import { mgnregaService } from '@/services/mgnrega';
// import { DISTRICTS } from '@/data/districts';

// const connectDB = async () => {
//   if (mongoose.connections[0].readyState) return;
  
//   try {
//     await mongoose.connect(process.env.MONGODB_URI || '');
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     throw error;
//   }
// };

// export async function GET(
//   request: Request,
//   context: { params: Promise<{ district_code: string }> }
// ) {
//   try {
//     await connectDB();
//     const params = await context.params;
//     const districtId = params.district_code;
    
//     console.log(`\n${'='.repeat(60)}`);
//     console.log(`📍 API Request for District ID: ${districtId}`);
    
//     const districtInfo = DISTRICTS.find(d => d.id === districtId);

//     if (!districtInfo) {
//       return NextResponse.json(
//         { error: 'District not found in configuration' },
//         { status: 404 }
//       );
//     }

//     console.log(`✅ Found in config: ${districtInfo.name}, ${districtInfo.state}`);

//     // ✅ USE getDistrictPerformanceByName instead of getDistrictPerformance
//     const performanceData = await mgnregaService.getDistrictPerformanceByName(
//       districtInfo.name,
//       districtInfo.state
//     );
    
//     console.log(`✅ Performance Data Retrieved:`);
//     console.log(`   District: ${performanceData.district_name}`);
//     console.log(`   State: ${performanceData.state_name}`);
//     console.log(`   District Code: ${performanceData.district_code}`);
//     console.log(`   Year: ${performanceData.fin_year}`);
//     console.log(`${'='.repeat(60)}\n`);
    
//     return NextResponse.json({
//       success: true,
//       district_code: performanceData.district_code,
//       district_name: performanceData.district_name,
//       state_name: performanceData.state_name,
//       meta: {
//         fin_year: performanceData.fin_year,
//         month: performanceData.month,
//         state_code: performanceData.state_code,
//         district_code: performanceData.district_code,
//         timestamp: new Date().toISOString(),
//       },
//       performance_data: {
//         // Employment Metrics
//         total_workers: parseInt(performanceData.Total_No_of_Workers) || 0,
//         active_workers: parseInt(performanceData.Total_No_of_Active_Workers) || 0,
//         total_households_worked: parseInt(performanceData.Total_Households_Worked) || 0,
//         total_individuals_worked: parseInt(performanceData.Total_Individuals_Worked) || 0,
        
//         // Job Cards
//         job_cards_issued: parseInt(performanceData.Total_No_of_JobCards_issued) || 0,
//         active_job_cards: parseInt(performanceData.Total_No_of_Active_Job_Cards) || 0,
        
//         // Employment Days & Wages
//         avg_days_employment: parseFloat(performanceData.Average_days_of_employment_provided_per_Household) || 0,
//         avg_wage_rate: parseFloat(performanceData.Average_Wage_rate_per_day_per_person) || 0,
//         completed_100_days: parseInt(performanceData.Total_No_of_HHs_completed_100_Days_of_Wage_Employment) || 0,
        
//         // Financial Data
//         approved_labour_budget: parseFloat(performanceData.Approved_Labour_Budget) || 0,
//         total_wages: parseFloat(performanceData.Wages) || 0,
//         material_skilled_wages: parseFloat(performanceData.Material_and_skilled_Wages || '0') || 0,
//         total_expenditure: parseFloat(performanceData.Total_Exp) || 0,
//         admin_expenditure: parseFloat(performanceData.Total_Adm_Expenditure || '0') || 0,
        
//         // Work Related
//         total_works_taken_up: parseInt(performanceData.Total_No_of_Works_Takenup || '0') || 0,
//         completed_works: parseInt(performanceData.Number_of_Completed_Works || '0') || 0,
//         ongoing_works: parseInt(performanceData.Number_of_Ongoing_Works || '0') || 0,
//         gps_with_nil_exp: parseInt(performanceData.Number_of_GPs_with_NIL_exp || '0') || 0,
        
//         // Participation Metrics
//         women_participation_days: parseInt(performanceData.Women_Persondays) || 0,
//         sc_participation_days: parseInt(performanceData.SC_persondays) || 0,
//         sc_workers_count: parseInt(performanceData.SC_workers_against_active_workers || '0') || 0,
//         st_participation_days: parseInt(performanceData.ST_persondays) || 0,
//         st_workers_count: parseInt(performanceData.ST_workers_against_active_workers || '0') || 0,
//         differently_abled: parseInt(performanceData.Differently_abled_persons_worked) || 0,
        
//         // Performance Percentages
//         payment_within_15_days: parseFloat(performanceData.percentage_payments_gererated_within_15_days) || 0,
//         category_b_works_percent: parseFloat(performanceData.percent_of_Category_B_Works || '0') || 0,
//         agriculture_allied_percent: parseFloat(performanceData.percent_of_Expenditure_on_Agriculture_Allied_Works || '0') || 0,
//         nrm_expenditure_percent: parseFloat(performanceData.percent_of_NRM_Expenditure || '0') || 0,
        
//         // Other Metrics
//         central_liability_persondays: parseInt(performanceData.Persondays_of_Central_Liability_so_far || '0') || 0,
//         remarks: performanceData.Remarks || 'NA'
//       },
//       statistics: {
//         total_people_employed: parseInt(performanceData.Total_Individuals_Worked) || 0,
//         total_households: parseInt(performanceData.Total_Households_Worked) || 0,
//         women_percentage: performanceData.Women_Persondays && performanceData.Total_Individuals_Worked ? 
//           ((parseInt(performanceData.Women_Persondays) / parseInt(performanceData.Total_Individuals_Worked)) * 100).toFixed(2) : 
//           '0',
//         sc_percentage: performanceData.SC_persondays && performanceData.Total_Individuals_Worked ? 
//           ((parseInt(performanceData.SC_persondays) / parseInt(performanceData.Total_Individuals_Worked)) * 100).toFixed(2) : 
//           '0',
//         st_percentage: performanceData.ST_persondays && performanceData.Total_Individuals_Worked ? 
//           ((parseInt(performanceData.ST_persondays) / parseInt(performanceData.Total_Individuals_Worked)) * 100).toFixed(2) : 
//           '0',
//       }
//     });

//   } catch (error) {
//     console.error('❌ Error fetching district data:', error);
//     return NextResponse.json(
//       { 
//         error: 'Failed to fetch district data',
//         message: error instanceof Error ? error.message : 'Unknown error',
//         details: 'The district may not have data available in the MGNREGA API. Please try another district.'
//       }, 
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from 'next/server';
// import mongoose from 'mongoose';
// import { DistrictPerformance } from '@/models/DistrictPerformance';
// import { mgnregaService } from '@/services/mgnrega';
// import { DISTRICTS } from '@/data/districts';
// import { redisService } from '@/services/redis';

// const connectDB = async () => {
//   if (mongoose.connections[0].readyState) return;
  
//   try {
//     await mongoose.connect(process.env.MONGODB_URI || '');
//     console.log('✅ Connected to MongoDB');
//   } catch (error) {
//     console.error('❌ MongoDB connection error:', error);
//     throw error;
//   }
// };

// export async function GET(
//   request: Request,
//   context: { params: Promise<{ district_code: string }> }
// ) {
//   try {
//     await connectDB();
//     const params = await context.params;
//     const districtId = params.district_code;
    
//     console.log(`\n${'='.repeat(60)}`);
//     console.log(`📍 API Request for District ID: ${districtId}`);
    
//     // 1. Find district info
//     const districtInfo = DISTRICTS.find(d => d.id === districtId);
//     if (!districtInfo) {
//       return NextResponse.json(
//         { error: 'District not found in configuration' },
//         { status: 404 }
//       );
//     }

//     console.log(`✅ Found in config: ${districtInfo.name}, ${districtInfo.state}`);

//     // Create cache keys
//     const redisCacheKey = `district:${districtInfo.name}:${districtInfo.state}`.toLowerCase();
//     const mongoQuery = {
//       district_name: districtInfo.name,
//       state_name: districtInfo.state,
//       expires_at: { $gt: new Date() }, // Not expired
//     };

//     // 2. Try Redis cache first (fastest - ~1ms)
//     const redisData = await redisService.get<any>(redisCacheKey);
//     if (redisData) {
//       console.log(`⚡ Served from Redis cache (instant)`);
//       console.log(`${'='.repeat(60)}\n`);
//       return NextResponse.json({
//         ...redisData,
//         cache_source: 'redis',
//         cache_age_seconds: Math.floor((Date.now() - new Date(redisData.meta.timestamp).getTime()) / 1000),
//       });
//     }

//     // 3. Try MongoDB cache (fast - ~50ms)
//     const mongoData = await DistrictPerformance.findOne(mongoQuery).sort({ created_at: -1 });
    
//     if (mongoData) {
//       console.log(`💾 Served from MongoDB cache`);
//       console.log(`   Created: ${mongoData.created_at.toISOString()}`);
//       console.log(`   Age: ${Math.floor((Date.now() - mongoData.created_at.getTime()) / 1000)}s`);

//       const responseData = {
//         success: true,
//         district_code: mongoData.district_code,
//         district_name: mongoData.district_name,
//         state_name: mongoData.state_name,
//         meta: mongoData.meta,
//         performance_data: mongoData.performance_data,
//         statistics: mongoData.statistics,
//       };

//       // Store in Redis for next time (5 min TTL)
//       await redisService.set(redisCacheKey, responseData, 300);

//       console.log(`${'='.repeat(60)}\n`);
//       return NextResponse.json({
//         ...responseData,
//         cache_source: 'mongodb',
//         cache_age_seconds: Math.floor((Date.now() - mongoData.created_at.getTime()) / 1000),
//       });
//     }

//     // 4. Fetch from API (slow - 2-5 seconds)
//     console.log(`🌐 Fetching from API (no cache available)`);
//     const performanceData = await mgnregaService.getDistrictPerformanceByName(
//       districtInfo.name,
//       districtInfo.state
//     );
    
//     console.log(`✅ Performance Data Retrieved:`);
//     console.log(`   District: ${performanceData.district_name}`);
//     console.log(`   State: ${performanceData.state_name}`);
//     console.log(`   District Code: ${performanceData.district_code}`);
//     console.log(`   Year: ${performanceData.fin_year}`);

//     // Transform API response
//     const responseData = {
//       success: true,
//       district_code: performanceData.district_code,
//       district_name: performanceData.district_name,
//       state_name: performanceData.state_name,
//       meta: {
//         fin_year: performanceData.fin_year,
//         month: performanceData.month,
//         state_code: performanceData.state_code,
//         api_district_code: performanceData.district_code,
//         timestamp: new Date().toISOString(),
//       },
//       performance_data: {
//         total_workers: parseInt(performanceData.Total_No_of_Workers) || 0,
//         active_workers: parseInt(performanceData.Total_No_of_Active_Workers) || 0,
//         total_households_worked: parseInt(performanceData.Total_Households_Worked) || 0,
//         total_individuals_worked: parseInt(performanceData.Total_Individuals_Worked) || 0,
//         job_cards_issued: parseInt(performanceData.Total_No_of_JobCards_issued) || 0,
//         active_job_cards: parseInt(performanceData.Total_No_of_Active_Job_Cards) || 0,
//         avg_days_employment: parseFloat(performanceData.Average_days_of_employment_provided_per_Household) || 0,
//         avg_wage_rate: parseFloat(performanceData.Average_Wage_rate_per_day_per_person) || 0,
//         completed_100_days: parseInt(performanceData.Total_No_of_HHs_completed_100_Days_of_Wage_Employment) || 0,
//         approved_labour_budget: parseFloat(performanceData.Approved_Labour_Budget) || 0,
//         total_wages: parseFloat(performanceData.Wages) || 0,
//         material_skilled_wages: parseFloat(performanceData.Material_and_skilled_Wages || '0') || 0,
//         total_expenditure: parseFloat(performanceData.Total_Exp) || 0,
//         admin_expenditure: parseFloat(performanceData.Total_Adm_Expenditure || '0') || 0,
//         total_works_taken_up: parseInt(performanceData.Total_No_of_Works_Takenup || '0') || 0,
//         completed_works: parseInt(performanceData.Number_of_Completed_Works || '0') || 0,
//         ongoing_works: parseInt(performanceData.Number_of_Ongoing_Works || '0') || 0,
//         gps_with_nil_exp: parseInt(performanceData.Number_of_GPs_with_NIL_exp || '0') || 0,
//         women_participation_days: parseInt(performanceData.Women_Persondays) || 0,
//         sc_participation_days: parseInt(performanceData.SC_persondays) || 0,
//         sc_workers_count: parseInt(performanceData.SC_workers_against_active_workers || '0') || 0,
//         st_participation_days: parseInt(performanceData.ST_persondays) || 0,
//         st_workers_count: parseInt(performanceData.ST_workers_against_active_workers || '0') || 0,
//         differently_abled: parseInt(performanceData.Differently_abled_persons_worked) || 0,
//         payment_within_15_days: parseFloat(performanceData.percentage_payments_gererated_within_15_days) || 0,
//         category_b_works_percent: parseFloat(performanceData.percent_of_Category_B_Works || '0') || 0,
//         agriculture_allied_percent: parseFloat(performanceData.percent_of_Expenditure_on_Agriculture_Allied_Works || '0') || 0,
//         nrm_expenditure_percent: parseFloat(performanceData.percent_of_NRM_Expenditure || '0') || 0,
//         central_liability_persondays: parseInt(performanceData.Persondays_of_Central_Liability_so_far || '0') || 0,
//         remarks: performanceData.Remarks || 'NA',
//       },
//       statistics: {
//         total_people_employed: parseInt(performanceData.Total_Individuals_Worked) || 0,
//         total_households: parseInt(performanceData.Total_Households_Worked) || 0,
//         women_percentage: performanceData.Women_Persondays && performanceData.Total_Individuals_Worked ? 
//           ((parseInt(performanceData.Women_Persondays) / parseInt(performanceData.Total_Individuals_Worked)) * 100).toFixed(2) : '0',
//         sc_percentage: performanceData.SC_persondays && performanceData.Total_Individuals_Worked ? 
//           ((parseInt(performanceData.SC_persondays) / parseInt(performanceData.Total_Individuals_Worked)) * 100).toFixed(2) : '0',
//         st_percentage: performanceData.ST_persondays && performanceData.Total_Individuals_Worked ? 
//           ((parseInt(performanceData.ST_persondays) / parseInt(performanceData.Total_Individuals_Worked)) * 100).toFixed(2) : '0',
//       },
//     };

//     // 5. Store in both caches for future requests
//     try {
//       // Save to MongoDB (1 hour TTL)
//       await DistrictPerformance.create({
//         ...responseData,
//         created_at: new Date(),
//         expires_at: new Date(Date.now() + 3600000), // 1 hour
//       });
//       console.log(`💾 Saved to MongoDB (TTL: 1 hour)`);

//       // Save to Redis (5 min TTL)
//       await redisService.set(redisCacheKey, responseData, 300);
//       console.log(`💾 Saved to Redis (TTL: 5 min)`);
//     } catch (cacheError) {
//       console.error('⚠️  Cache save error (non-critical):', cacheError);
//     }

//     console.log(`${'='.repeat(60)}\n`);
//     return NextResponse.json({
//       ...responseData,
//       cache_source: 'api',
//       cache_age_seconds: 0,
//     });

//   } catch (error) {
//     console.error('❌ Error fetching district data:', error);
//     return NextResponse.json(
//       { 
//         error: 'Failed to fetch district data',
//         message: error instanceof Error ? error.message : 'Unknown error',
//         details: 'The district may not have data available in the MGNREGA API. Please try another district.'
//       }, 
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { DistrictPerformance } from '@/models/DistrictPerformance';
import { mgnregaService } from '@/services/mgnrega';
import { DISTRICTS } from '@/data/districts';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('✅ MongoDB already connected');
    return;
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};

// Track ongoing API requests to prevent duplicate calls
const ongoingRequests = new Map<string, Promise<any>>();

// ✅ HELPER: Normalize district/state names for consistent matching
function normalizeDistrictName(name: string): string {
  return name.trim().toUpperCase();
}

export async function GET(
  request: Request,
  context: { params: Promise<{ district_code: string }> }
) {
  try {
    await connectDB();
    const params = await context.params;
    const districtId = params.district_code;
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📍 API Request for District ID: ${districtId}`);
    
    // 1. Find district info
    const districtInfo = DISTRICTS.find(d => d.id === districtId);
    if (!districtInfo) {
      return NextResponse.json(
        { error: 'District not found in configuration' },
        { status: 404 }
      );
    }

    console.log(`✅ Found in config: ${districtInfo.name}, ${districtInfo.state}`);

    // 2. Try MongoDB cache with NORMALIZED names
    const normalizedDistrictName = normalizeDistrictName(districtInfo.name);
    const normalizedStateName = normalizeDistrictName(districtInfo.state);

    const mongoQuery = {
      district_name: normalizedDistrictName,
      state_name: normalizedStateName,
    };

    console.log(`🔍 Searching MongoDB with query:`, mongoQuery);

    const mongoData = await DistrictPerformance.findOne(mongoQuery).sort({ created_at: -1 }).lean();
    
    if (mongoData) {
      //@ts-ignore
      const cacheAge = Math.floor((Date.now() - new Date(mongoData.created_at).getTime()) / 1000);
      //@ts-ignore
      const isExpired = new Date(mongoData.expires_at) < new Date();
      
      console.log(`💾 Found MongoDB cache!`);
      console.log(`   Age: ${cacheAge}s`);
      console.log(`   Expired: ${isExpired}`);
      //@ts-ignore
      console.log(`   Created: ${mongoData.created_at}`);
      //@ts-ignore
      console.log(`   Expires: ${mongoData.expires_at}`);
      
      // ✅ SERVE CACHE IMMEDIATELY
      const responseData = {
        success: true,
        //@ts-ignore
        district_code: mongoData.district_code,
        //@ts-ignore
        district_name: mongoData.district_name,
        //@ts-ignore
        state_name: mongoData.state_name,
        //@ts-ignore
        meta: mongoData.meta,
        //@ts-ignore
        performance_data: mongoData.performance_data,
        //@ts-ignore
        statistics: mongoData.statistics,
      };

      // ✅ IF CACHE IS OLD (> 30 min), REFRESH IN BACKGROUND
      if (cacheAge > 1800) {
        console.log(`🔄 Cache is old, triggering background refresh...`);
        refreshCacheInBackground(districtInfo).catch(err => {
          console.error('⚠️  Background refresh failed:', err.message);
        });
      }

      console.log(`${'='.repeat(60)}\n`);
      return NextResponse.json({
        ...responseData,
        cache_source: 'mongodb',
        cache_age_seconds: cacheAge,
        cache_status: isExpired ? 'stale' : 'fresh',
      });
    }

    console.log(`❌ No MongoDB cache found`);

    // 3. NO CACHE - Fetch from API
    console.log(`🌐 Fetching from API...`);
    const responseData = await fetchAndCacheData(districtInfo);

    console.log(`${'='.repeat(60)}\n`);
    return NextResponse.json({
      ...responseData,
      cache_source: 'api',
      cache_age_seconds: 0,
    });

  } catch (error) {
    console.error('❌ Error fetching district data:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch district data',
        message: error instanceof Error ? error.message : 'Unknown error',
        details: 'The district may not have data available in the MGNREGA API. Please try another district.'
      }, 
      { status: 500 }
    );
  }
}

// ✅ HELPER: Fetch and cache data
async function fetchAndCacheData(
  districtInfo: { name: string; state: string }
) {
  const requestKey = `${districtInfo.name}:${districtInfo.state}`;
  
  // Check if request is already in progress
  if (ongoingRequests.has(requestKey)) {
    console.log(`⏳ Request already in progress, waiting...`);
    return await ongoingRequests.get(requestKey);
  }

  // Start new request
  const requestPromise = (async () => {
    try {
      console.log(`🌐 Calling MGNREGA API for ${districtInfo.name}, ${districtInfo.state}...`);
      
      const performanceData = await mgnregaService.getDistrictPerformanceByName(
        districtInfo.name,
        districtInfo.state
      );
      
      console.log(`✅ API Data Retrieved:`);
      console.log(`   District: ${performanceData.district_name}`);
      console.log(`   State: ${performanceData.state_name}`);
      console.log(`   Code: ${performanceData.district_code}`);
      console.log(`   Year: ${performanceData.fin_year}`);

      // ✅ NORMALIZE names for consistent storage
      const normalizedDistrictName = normalizeDistrictName(performanceData.district_name);
      const normalizedStateName = normalizeDistrictName(performanceData.state_name);

      const responseData = {
        success: true,
        district_code: performanceData.district_code,
        district_name: normalizedDistrictName,  // ✅ UPPERCASE
        state_name: normalizedStateName,        // ✅ UPPERCASE
        meta: {
          fin_year: performanceData.fin_year,
          month: performanceData.month,
          state_code: performanceData.state_code,
          api_district_code: performanceData.district_code,
          timestamp: new Date().toISOString(),
        },
        performance_data: {
          total_workers: parseInt(performanceData.Total_No_of_Workers) || 0,
          active_workers: parseInt(performanceData.Total_No_of_Active_Workers) || 0,
          total_households_worked: parseInt(performanceData.Total_Households_Worked) || 0,
          total_individuals_worked: parseInt(performanceData.Total_Individuals_Worked) || 0,
          job_cards_issued: parseInt(performanceData.Total_No_of_JobCards_issued) || 0,
          active_job_cards: parseInt(performanceData.Total_No_of_Active_Job_Cards) || 0,
          avg_days_employment: parseFloat(performanceData.Average_days_of_employment_provided_per_Household) || 0,
          avg_wage_rate: parseFloat(performanceData.Average_Wage_rate_per_day_per_person) || 0,
          completed_100_days: parseInt(performanceData.Total_No_of_HHs_completed_100_Days_of_Wage_Employment) || 0,
          approved_labour_budget: parseFloat(performanceData.Approved_Labour_Budget) || 0,
          total_wages: parseFloat(performanceData.Wages) || 0,
          material_skilled_wages: parseFloat(performanceData.Material_and_skilled_Wages || '0') || 0,
          total_expenditure: parseFloat(performanceData.Total_Exp) || 0,
          admin_expenditure: parseFloat(performanceData.Total_Adm_Expenditure || '0') || 0,
          total_works_taken_up: parseInt(performanceData.Total_No_of_Works_Takenup || '0') || 0,
          completed_works: parseInt(performanceData.Number_of_Completed_Works || '0') || 0,
          ongoing_works: parseInt(performanceData.Number_of_Ongoing_Works || '0') || 0,
          gps_with_nil_exp: parseInt(performanceData.Number_of_GPs_with_NIL_exp || '0') || 0,
          women_participation_days: parseInt(performanceData.Women_Persondays) || 0,
          sc_participation_days: parseInt(performanceData.SC_persondays) || 0,
          sc_workers_count: parseInt(performanceData.SC_workers_against_active_workers || '0') || 0,
          st_participation_days: parseInt(performanceData.ST_persondays) || 0,
          st_workers_count: parseInt(performanceData.ST_workers_against_active_workers || '0') || 0,
          differently_abled: parseInt(performanceData.Differently_abled_persons_worked) || 0,
          payment_within_15_days: parseFloat(performanceData.percentage_payments_gererated_within_15_days) || 0,
          category_b_works_percent: parseFloat(performanceData.percent_of_Category_B_Works || '0') || 0,
          agriculture_allied_percent: parseFloat(performanceData.percent_of_Expenditure_on_Agriculture_Allied_Works || '0') || 0,
          nrm_expenditure_percent: parseFloat(performanceData.percent_of_NRM_Expenditure || '0') || 0,
          central_liability_persondays: parseInt(performanceData.Persondays_of_Central_Liability_so_far || '0') || 0,
          remarks: performanceData.Remarks || 'NA',
        },
        statistics: {
          total_people_employed: parseInt(performanceData.Total_Individuals_Worked) || 0,
          total_households: parseInt(performanceData.Total_Households_Worked) || 0,
          women_percentage: performanceData.Women_Persondays && performanceData.Total_Individuals_Worked ? 
            ((parseInt(performanceData.Women_Persondays) / parseInt(performanceData.Total_Individuals_Worked)) * 100).toFixed(2) : '0',
          sc_percentage: performanceData.SC_persondays && performanceData.Total_Individuals_Worked ? 
            ((parseInt(performanceData.SC_persondays) / parseInt(performanceData.Total_Individuals_Worked)) * 100).toFixed(2) : '0',
          st_percentage: performanceData.ST_persondays && performanceData.Total_Individuals_Worked ? 
            ((parseInt(performanceData.ST_persondays) / parseInt(performanceData.Total_Individuals_Worked)) * 100).toFixed(2) : '0',
        },
      };

      // ✅ SAVE TO MONGODB with normalized names
      console.log(`💾 Attempting to save to MongoDB...`);
      console.log(`   District: ${normalizedDistrictName}`);
      console.log(`   State: ${normalizedStateName}`);
      
      try {
        const result = await DistrictPerformance.findOneAndUpdate(
          { 
            district_name: normalizedDistrictName,
            state_name: normalizedStateName
          },
          {
            $set: {
              ...responseData,
              created_at: new Date(),
              expires_at: new Date(Date.now() + 3600000), // 1 hour
            }
          },
          { 
            upsert: true,
            new: true,
            runValidators: true
          }
        );
        
        console.log(`✅ MongoDB save successful!`);
        console.log(`   Document ID: ${result?._id}`);
        console.log(`   Created at: ${result?.created_at}`);
        console.log(`   Expires at: ${result?.expires_at}`);
      } catch (dbError) {
        console.error('❌ MongoDB save FAILED:', dbError);
        if (dbError instanceof Error) {
          console.error('   Error message:', dbError.message);
          console.error('   Error stack:', dbError.stack);
        }
        throw dbError;
      }

      return responseData;
    } finally {
      ongoingRequests.delete(requestKey);
    }
  })();

  ongoingRequests.set(requestKey, requestPromise);
  return await requestPromise;
}

// ✅ HELPER: Background cache refresh
async function refreshCacheInBackground(
  districtInfo: { name: string; state: string }
) {
  console.log(`🔄 Background refresh for ${districtInfo.name}...`);
  
  try {
    await fetchAndCacheData(districtInfo);
    console.log(`✅ Background refresh completed`);
  } catch (error) {
    console.error(`❌ Background refresh failed:`, error);
  }
}