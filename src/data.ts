import { PredictionItem, MapHotspot, IncidentEvent } from './types';

export const INITIAL_PREDICTIONS: PredictionItem[] = [
  {
    id: 'pred-1',
    type: 'Flood Risk',
    hazard: 'Sewer Overload & Urban Inundation',
    probability: 87,
    timeframe: 'Next 2 Hours',
    severity: 'critical',
    reason: 'Heavy localized cell storm coupled with a 42% blockage rate in the Ward 12 stormwater drain drainage system during evening school release hours.',
    evidence: [
      'Radar indicates 45mm precip cell moving 12km/h south-southeast.',
      'Acoustic flow-monitoring sensors at Junction 4B show 90% velocity reduction.',
      'Civil telemetry: Closed-Circuit TV shows leaf clutter pile-up on North-end intake grates.'
    ],
    recommendations: [
      'Proactively close Road 7 subpass and redirect north-bound traffic to Highway 10.',
      'Deploy rapid response sanitation crew to purge debris from Junction 4B intake.',
      'Dispatch early alert notifications to Ward 12 schools requesting staggered dismissals.'
    ],
    dataSources: ['NEXRAD Weather Radar', 'Ward 12 Municipal Flow Sensors', 'Community CCTV Debris Index']
  },
  {
    id: 'pred-2',
    type: 'Hospital Overload',
    hazard: 'Emergency Room Bottleneck',
    probability: 79,
    timeframe: 'Next 4 Hours',
    severity: 'high',
    reason: 'Sudden heat index spike combined with an expected wave of elder visits during the localized power-grid load shedding in District 3.',
    evidence: [
      'District 3 power telemetry projects substation 102 cooling cycles will stagger at 14:00.',
      'Historical thermal stress patterns correlate power dips with a 3.4x elder syncope triage surge.',
      'ER intake status shows 14/18 beds occupied currently.'
    ],
    recommendations: [
      'Establish a temporary cooling shelter at District 3 Civic Hall with back-up diesel generator.',
      'Request Mercy General Hospital transition 6 outpatient beds to overflow emergency holding.',
      'Initiate targeted automated calling tree to registered elder care facilities in targeted zip codes.'
    ],
    dataSources: ['SmartGrid Load Profiler', 'Mercy ER Admissions Live API', 'Ambient Temperature Micro-Sensors']
  },
  {
    id: 'pred-3',
    type: 'Air Pollution Spikes',
    hazard: 'High PM2.5 Inhalation Risk',
    probability: 92,
    timeframe: 'Tomorrow Morning',
    severity: 'high',
    reason: 'Micro-climate inversion layer trapping heavy early commuter exhaust emissions near Valley Boulevard commercial artery.',
    evidence: [
      'Barometric tracking signals high pressure dome stagnating over the valley basin.',
      'Freight shipping log lists 32 heavy diesel multi-axles scheduled to pass between 06:00 - 08:00.',
      'Laser particle counters show base PM2.5 climbing from 45µg/m³ to 88µg/m³ in the last 6 hours.'
    ],
    recommendations: [
      'Mandate heavy-freight bypass via Outer Ring Expressway during peak commuter window (06:00-09:00).',
      'Provide public advisory suggesting active carbon filtration masks for morning joggers in Valley Boulevard zone.',
      'Trigger ventilation system boost in the nearby subway tunnels to draw down ambient surface air.'
    ],
    dataSources: ['Lidar Aero-Analysis Array', 'VMT Commuter Traffic Estimator', 'Regional Air Quality Monitor Node 12']
  },
  {
    id: 'pred-4',
    type: 'Power Outage Risk',
    hazard: 'Thermal Transformer Overload',
    probability: 68,
    timeframe: 'Next 6 Hours',
    severity: 'medium',
    reason: 'High ambient temperature (39.5°C) forcing HVAC compressors to draw continuous peak load of 4.8kW per household in residential sector 5B.',
    evidence: [
      'Transformer substation 5B winding temperature telemetry is at 108°C (critical threshold is 115°C).',
      'Smart meter aggregates show load climbing 8.5% year-over-year in Sector 5B.',
      'No cloud shadow relief predicted for the next 240 minutes.'
    ],
    recommendations: [
      'Distribute smart-thermostat demand response signal to temporarily shift target indoor temps to 25°C.',
      'Deploy mobile liquid nitrogen cooling trailer to Substation 5B for emergency ambient cooling.',
      'Alert critical care residents registered in the area of prospective 30-minute backup swap periods.'
    ],
    dataSources: ['Substation Thermal Telemetry', 'Smart Meter Aggregator', 'NWS Solar Radiance Feed']
  }
];

export const INITIAL_HOTSPOTS: MapHotspot[] = [
  {
    id: 'hs-1',
    lat: 380, // percentage or coordinates in local UI grid
    lng: 420,
    name: 'District 4 Low-Pass Subpass',
    status: 'critical',
    hazard: 'Active Water Accumulation',
    affectedCount: 1420,
    confidence: 94,
    timeline: [
      { time: '08:00', event: 'Sensor detects water accumulation of 5.2 cm.' },
      { time: '08:15', event: 'AI triggers flash flood warning for District 4 commute.' },
      { time: '08:22', event: 'Guardian AI drafts redirect plan for local transit.' }
    ],
    aiReasoning: 'Runoff coefficient is 0.85 in this asphalt-heavy basin. Surrounding clay is fully saturated from last week\'s storm. High tide blocks drainage pipe exit into the eastern canal.',
    actions: [
      'Activate automated warning gate arm to block subpass ingress.',
      'Trigger sump pump power-boost sequence.',
      'Notify District 4 patrol units for physical barrier confirmation.'
    ]
  },
  {
    id: 'hs-2',
    lat: 220,
    lng: 640,
    name: 'Substation 12 Grid Hub',
    status: 'warning',
    hazard: 'Substation Core Overheating',
    affectedCount: 8400,
    confidence: 82,
    timeline: [
      { time: '07:30', event: 'Substation core temperature increases to 98°C.' },
      { time: '07:50', event: 'Predictive algorithm isolates demand peak at 13:00.' }
    ],
    aiReasoning: 'Excessive thermal load from high HVAC demand in adjacent business complexes. Airflow around thermal coils is impeded by dust and local construction barriers.',
    actions: [
      'Initiate targeted load shedding cycle for commercial non-critical systems.',
      'Issue demand response reward points to residential zone 4 smart meters.'
    ]
  },
  {
    id: 'hs-3',
    lat: 180,
    lng: 290,
    name: 'Valley Arterial Boulevard',
    status: 'prediction',
    hazard: 'Commute Bottleneck & PM2.5 Spike',
    affectedCount: 3200,
    confidence: 89,
    timeline: [
      { time: '06:00', event: 'Laser sensor indicates rising micro-particulates.' },
      { time: '06:45', event: 'Guardian AI projects bottleneck score of 8.8/10 during morning rush.' }
    ],
    aiReasoning: 'Atmospheric cold front is capping the Valley boundary, preventing rising dispersal of combustion fumes. Commuter count is 11% higher due to light rail maintenance closure.',
    actions: [
      'Implement real-time toll adjustment to incentivize Outer Ring pathing.',
      'Deploy smart traffic light timing prioritizing continuous exhaust-less vehicle flow.'
    ]
  },
  {
    id: 'hs-4',
    lat: 520,
    lng: 550,
    name: 'Mercy Medical Center ER',
    status: 'safe',
    hazard: 'High Influx Buffer',
    affectedCount: 450,
    confidence: 91,
    timeline: [
      { time: '08:00', event: 'ER triage queue is nominal. 3 surplus beds available.' }
    ],
    aiReasoning: 'Currently operating within standard margins. Standard seasonal patient influx remains stable. No neighboring facilities reporting containment issues.',
    actions: [
      'Maintain status-quo tracking.',
      'Reserve standby clinical team for potential power-grid triage backup.'
    ]
  }
];

export const INITIAL_TIMELINE: IncidentEvent[] = [
  {
    id: 'inc-1',
    timestamp: '08:12 AM',
    title: 'Ward 12 Stormwater Backflow Alert',
    category: 'weather',
    severity: 'critical',
    description: 'Debris intake blockage detected at Main Sewer line 3. Internal pressure spiked by 180% within 10 minutes.',
    aiSummary: 'Guardian AI models localized inundation of residential driveways within 15 minutes unless rapid sanitation sweep occurs. Flow sensors indicate immediate backflow danger.',
    citizenAudioTranscript: '“Yeah, we are looking at the drain right outside the school. Water is gurgling up instead of going down. It is covered in plastic bags and wet leaves. It’s starting to flood the sidewalk already...”',
    evidencePhoto: 'https://images.unsplash.com/photo-1511185307590-3c29c11275ca?w=800&auto=format&fit=crop&q=60' // generic water storm texture represented safely via CDN
  },
  {
    id: 'inc-2',
    timestamp: '07:45 AM',
    title: 'Anomalous Commuter Congestion at Valley Junction',
    category: 'traffic',
    severity: 'high',
    description: 'An unexpected 140-vehicle queue formed on Valley Junction offramp. Heavy diesel delivery trucks are causing high-occupancy bottlenecks.',
    aiSummary: 'Guardian AI isolated the bottleneck cause: a disabled cargo van blocking the left transit lane. Dispatching digital road warning signs 1.5 miles prior to route.',
    evidencePhoto: 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=800&auto=format&fit=crop&q=60' // generic city highway traffic
  },
  {
    id: 'inc-3',
    timestamp: '06:30 AM',
    title: 'Low-Voltage Sag: Sector 5B Substation',
    category: 'infrastructure',
    severity: 'medium',
    description: 'Primary grid sensor 92 experienced a short duration 12V sag, indicating early transformer insulation degradation under high local morning demand.',
    aiSummary: 'Guardian AI ran diagnostic: insulation integrity score is at 82%. Automated recommendation: reroute 5% load to south substation and schedule thermal scan.'
  }
];
