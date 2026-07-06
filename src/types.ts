export type OnboardingRole =
  | 'government'
  | 'citizen'
  | 'hospital'
  | 'police'
  | 'ngo'
  | 'school'
  | 'utility'
  | 'fire_department';

export type ActiveTab =
  | 'dashboard'
  | 'map'
  | 'predictions'
  | 'chat'
  | 'timeline'
  | 'simulation'
  | 'reports'
  | 'settings';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  charts?: {
    type: 'bar' | 'line' | 'pie';
    title: string;
    data: Array<{ name: string; value: number; secondary?: number }>;
  };
  recommendations?: string[];
  confidence?: number;
}

export interface PredictionItem {
  id: string;
  type: string;
  hazard: string;
  probability: number; // 0 to 100
  timeframe: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  reason: string;
  evidence: string[];
  recommendations: string[];
  dataSources: string[];
}

export interface MapHotspot {
  id: string;
  lat: number; // grid coords since we use canvas/vector map
  lng: number; // grid coords
  name: string;
  status: 'safe' | 'warning' | 'critical' | 'prediction';
  hazard: string;
  affectedCount: number;
  confidence: number;
  timeline: Array<{ time: string; event: string }>;
  aiReasoning: string;
  actions: string[];
}

export interface SimulationInputs {
  rainfall: number; // mm/hr
  temperature: number; // °C
  trafficLoad: number; // %
  hospitalCapacity: number; // %
  roadClosures: number; // count
  electricityDemand: number; // MW
  treePlantationCount: number; // count
  budgetAllocation: number; // $M
}

export interface SimulationResult {
  riskScore: number; // 0 to 100
  financialImpact: string; // e.g. "$12.4M Saved"
  affectedCitizens: number;
  severity: 'low' | 'moderate' | 'elevated' | 'critical';
  metrics: {
    floodProbability: number;
    gridStability: number;
    responseDelay: number;
    airQualityIndex: number;
  };
  narrative: string;
  mitigationSteps: string[];
  charts: Array<{ name: string; value: number }>;
}

export interface IncidentEvent {
  id: string;
  timestamp: string;
  title: string;
  category: 'weather' | 'infrastructure' | 'medical' | 'traffic' | 'security';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  aiSummary: string;
  evidencePhoto?: string;
  citizenAudioTranscript?: string;
}
