'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { AuthUser } from '@/types/auth';
import { saveUserSettingsToFirestore, getUserSettingsFromFirestore } from '@/lib/firebase/user-service';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/ui/form-field';
import { Alert } from '@/components/ui/alert';
import {
  User,
  ShieldCheck,
  Key,
  CheckCircle2,
  Bell,
  Sliders,
  Lock,
  MapPin,
  Globe,
  Locate,
  Loader2,
  Headphones,
  X,
  ShieldAlert,
  FileText,
  Search,
  Check,
  FileCheck,
  Printer,
  Sparkles,
  Download,
  Eye,
  Filter,
} from 'lucide-react';

interface InteractiveMapPreviewProps {
  latitude: string;
  longitude: string;
  onChangeLocation: (lat: string, lng: string) => void;
}

export interface CorporateDocument {
  slNo: number;
  id: string;
  title: string;
  originalTitle: string;
  code: string;
  stage: string;
  stageBadgeColor: string;
  fileSize: string;
  version: string;
  description: string;
  keyFields: string[];
}

// User-provided SVG Icons with responsive styling and currentColor compatibility
function ViewCustomSvgIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <g clipPath="url(#clip0_4418_8295)">
        <path d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z" />
        <path d="M11.9999 9.14062C10.4299 9.14062 9.1499 10.4206 9.1499 12.0006C9.1499 13.5706 10.4299 14.8506 11.9999 14.8506C13.5699 14.8506 14.8599 13.5706 14.8599 12.0006C14.8599 10.4306 13.5699 9.14062 11.9999 9.14062Z" />
      </g>
      <defs>
        <clipPath id="clip0_4418_8295">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function DownloadCustomSvgIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <g clipPath="url(#clip0_4418_8507)">
        <path d="M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19ZM12.28 15.78L10.28 17.78C10.21 17.85 10.12 17.91 10.03 17.94C9.94 17.98 9.85 18 9.75 18C9.65 18 9.56 17.98 9.47 17.94C9.39 17.91 9.31 17.85 9.25 17.79C9.24 17.78 9.23 17.78 9.23 17.77L7.23 15.77C6.94 15.48 6.94 15 7.23 14.71C7.52 14.42 8 14.42 8.29 14.71L9 15.44V11.25C9 10.84 9.34 10.5 9.75 10.5C10.16 10.5 10.5 10.84 10.5 11.25V15.44L11.22 14.72C11.51 14.43 11.99 14.43 12.28 14.72C12.57 15.01 12.57 15.49 12.28 15.78Z" />
        <path d="M17.4299 8.81048C18.3799 8.82048 19.6999 8.82048 20.8299 8.82048C21.3999 8.82048 21.6999 8.15048 21.2999 7.75048C19.8599 6.30048 17.2799 3.69048 15.7999 2.21048C15.3899 1.80048 14.6799 2.08048 14.6799 2.65048V6.14048C14.6799 7.60048 15.9199 8.81048 17.4299 8.81048Z" />
      </g>
      <defs>
        <clipPath id="clip0_4418_8507">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

// Complete 22 Master Documents in RAS (Requirements, Architecture, Supply, Execution, Handover, Settlement) Order
const DOCUMENT_ITEMS: CorporateDocument[] = [
  {
    slNo: 1,
    id: 'doc-lead-registration',
    title: 'Lead Registration Form',
    originalTitle: 'Lead Registration Form?',
    code: 'AERIQ-DOC-001',
    stage: 'Stage 1: Lead & Discovery',
    stageBadgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    fileSize: '1.2 MB',
    version: 'v2.1',
    description: 'Formal registration of new client lead, initial project site details, capacity scope, and contact matrix.',
    keyFields: ['Lead ID', 'Client Name', 'Facility Location', 'Target Capacity', 'Lead Source'],
  },
  {
    slNo: 2,
    id: 'doc-crd',
    title: 'Customer Requirement Document (CRD)',
    originalTitle: 'Customer Requriement Document',
    code: 'AERIQ-DOC-002',
    stage: 'Stage 1: Lead & Discovery',
    stageBadgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    fileSize: '2.4 MB',
    version: 'v1.4',
    description: 'Comprehensive specification document capturing operational parameters, water quality targets, and site constraints.',
    keyFields: ['Water Parameters', 'Aeration Capacity', 'Power Grid Spec', 'Target Biomass', 'Site Topography'],
  },
  {
    slNo: 3,
    id: 'doc-nda',
    title: 'Non-Disclosure Agreement (NDA)',
    originalTitle: 'NDA Non-Disclouser-Agremment',
    code: 'AERIQ-DOC-003',
    stage: 'Stage 2: Legal & Mutual Alignment',
    stageBadgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    fileSize: '840 KB',
    version: 'v3.0',
    description: 'Bilateral legal contract protecting technical IP, farm operational data, and commercial discussions.',
    keyFields: ['Effective Date', 'Disclosing Party', 'Receiving Party', 'Term Duration', 'Jurisdiction'],
  },
  {
    slNo: 4,
    id: 'doc-mou',
    title: 'Memorandum of Understanding (MOU)',
    originalTitle: 'MOU Memorandum of Understanding',
    code: 'AERIQ-DOC-004',
    stage: 'Stage 2: Legal & Mutual Alignment',
    stageBadgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    fileSize: '1.1 MB',
    version: 'v2.0',
    description: 'Framework agreement establishing intent to collaborate on aquaculture automation and equipment deployment.',
    keyFields: ['Scope of Cooperation', 'Roles & Responsibilities', 'Milestones', 'Validity Period'],
  },
  {
    slNo: 5,
    id: 'doc-tech-proposal',
    title: 'Preliminary Technical Proposal',
    originalTitle: 'Prelimilary Techincal Proposal',
    code: 'AERIQ-DOC-005',
    stage: 'Stage 3: Proposals & Commercials',
    stageBadgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    fileSize: '4.8 MB',
    version: 'v1.8',
    description: 'Engineering proposal detailing AERIQ system architecture, oxygenation calculations, and sensor layout.',
    keyFields: ['System Design', 'Flow Diagrams', 'Aerator Sizing', 'Automation Topology', 'Bill of Quantities'],
  },
  {
    slNo: 6,
    id: 'doc-cost-estimate',
    title: 'Preliminary Cost Estimate',
    originalTitle: 'Prelimilary Cost Estimate',
    code: 'AERIQ-DOC-006',
    stage: 'Stage 3: Proposals & Commercials',
    stageBadgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    fileSize: '1.6 MB',
    version: 'v1.5',
    description: 'Indicative financial breakdown covering hardware, freight, installation, commissioning, and support.',
    keyFields: ['Hardware CAPEX', 'Installation OPEX', 'Freight Estimate', 'Taxes & Duties', 'Total Budget'],
  },
  {
    slNo: 7,
    id: 'doc-price-list',
    title: 'Standard Price List',
    originalTitle: 'Price List',
    code: 'AERIQ-DOC-007',
    stage: 'Stage 3: Proposals & Commercials',
    stageBadgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    fileSize: '950 KB',
    version: 'v2026.1',
    description: 'Approved corporate tariff catalog for AERIQ aeration units, sensors, control panels, and spares.',
    keyFields: ['SKU Code', 'Component Description', 'Unit Price', 'Warranty Tier', 'Lead Time'],
  },
  {
    slNo: 8,
    id: 'doc-quotation-acceptance',
    title: 'Quotation Acceptance',
    originalTitle: 'Quotation Acceptance',
    code: 'AERIQ-DOC-008',
    stage: 'Stage 3: Proposals & Commercials',
    stageBadgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    fileSize: '780 KB',
    version: 'v1.2',
    description: 'Client authorization letter confirming acceptance of final commercial quotation and payment terms.',
    keyFields: ['Quotation Ref', 'Approved Amount', 'Client Signatory', 'Purchase Order Ref', 'Acceptance Date'],
  },
  {
    slNo: 9,
    id: 'doc-supply-agreement',
    title: 'Supply Agreement',
    originalTitle: 'Supply Agremment',
    code: 'AERIQ-DOC-009',
    stage: 'Stage 4: Contracting & Procurement',
    stageBadgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    fileSize: '3.2 MB',
    version: 'v2.2',
    description: 'Definitive commercial contract detailing equipment delivery, payment schedule, title transfer, and liabilities.',
    keyFields: ['Contract Value', 'Payment Schedule', 'Delivery Terms (Incoterms)', 'Warranty Terms', 'Termination'],
  },
  {
    slNo: 10,
    id: 'doc-advance-receipt',
    title: 'Advance Payment Receipt',
    originalTitle: 'Advance Payment Recipt',
    code: 'AERIQ-DOC-010',
    stage: 'Stage 4: Contracting & Procurement',
    stageBadgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    fileSize: '620 KB',
    version: 'v1.0',
    description: 'Official financial voucher confirming receipt of contract mobilization advance payment.',
    keyFields: ['Receipt No', 'Transaction Reference', 'Amount Paid', 'Tax Invoice No', 'Bank Confirmation'],
  },
  {
    slNo: 11,
    id: 'doc-material-purchase',
    title: 'Material Purchase Records',
    originalTitle: 'Material Purcahse Records Document',
    code: 'AERIQ-DOC-011',
    stage: 'Stage 4: Contracting & Procurement',
    stageBadgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    fileSize: '2.9 MB',
    version: 'v1.1',
    description: 'Traceability record of raw materials, motors, sensors, and structural components procured for the project.',
    keyFields: ['PO Reference', 'Supplier Name', 'Batch Serial Numbers', 'Mill Test Certificates', 'Quality Clearance'],
  },
  {
    slNo: 12,
    id: 'doc-pdi-report',
    title: 'Pre-Dispatch Inspection (PDI) Report',
    originalTitle: 'Pre Dispatch Inspection PDI',
    code: 'AERIQ-DOC-012',
    stage: 'Stage 5: Quality & Dispatch',
    stageBadgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    fileSize: '3.5 MB',
    version: 'v1.6',
    description: 'Factory acceptance test (FAT) documentation certifying electrical insulation, pressure tests, and motor runs.',
    keyFields: ['Inspection Date', 'Inspector Sign-off', 'Motor Insulation Test', 'Pressure Rating', 'Pass/Fail Status'],
  },
  {
    slNo: 13,
    id: 'doc-delivery-challan',
    title: 'Delivery Challan (DC)',
    originalTitle: 'Delivery Challan DC',
    code: 'AERIQ-DOC-013',
    stage: 'Stage 5: Quality & Dispatch',
    stageBadgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    fileSize: '890 KB',
    version: 'v1.3',
    description: 'Goods dispatch note listing serialized hardware, shipment packages, carrier details, and tracking number.',
    keyFields: ['Challan No', 'Vehicle No', 'Transporter Name', 'Itemized Hardware List', 'Receiver Signature'],
  },
  {
    slNo: 14,
    id: 'doc-site-readiness',
    title: 'Site Readiness Checklist',
    originalTitle: 'Site Readness Checklist',
    code: 'AERIQ-DOC-014',
    stage: 'Stage 6: Site Deployment',
    stageBadgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    fileSize: '1.4 MB',
    version: 'v2.1',
    description: 'Pre-installation verification of civil foundations, power availability, cable trenching, and safety clearance.',
    keyFields: ['Civil Foundation', '3-Phase Power', 'Water Level Clearance', 'Control Room Setup', 'Safety Audit'],
  },
  {
    slNo: 15,
    id: 'doc-installation-report',
    title: 'Installation & Commissioning Report',
    originalTitle: 'Installation Report',
    code: 'AERIQ-DOC-015',
    stage: 'Stage 6: Site Deployment',
    stageBadgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    fileSize: '5.1 MB',
    version: 'v2.0',
    description: 'Field engineer log documenting physical assembly, wiring, telemetry sync, and initial trial runs.',
    keyFields: ['Site Engineer ID', 'Commissioning Date', 'Telemetry Signal Strength', 'Trial Run Hours', 'Sign-off'],
  },
  {
    slNo: 16,
    id: 'doc-warranty-certificate',
    title: 'Warranty Certificate',
    originalTitle: 'Warrent VCeritificate',
    code: 'AERIQ-DOC-016',
    stage: 'Stage 7: Handover & Acceptance',
    stageBadgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
    fileSize: '980 KB',
    version: 'v1.0',
    description: 'Official manufacturer warranty certificate specifying coverage periods, component guarantees, and SLA terms.',
    keyFields: ['Certificate No', 'Warranty Period', 'Covered Components', 'Exclusions', 'Support Contacts'],
  },
  {
    slNo: 17,
    id: 'doc-client-acceptance',
    title: 'Client Acceptance Certificate',
    originalTitle: 'Client Acceptance Ceritificate',
    code: 'AERIQ-DOC-017',
    stage: 'Stage 7: Handover & Acceptance',
    stageBadgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
    fileSize: '1.2 MB',
    version: 'v1.5',
    description: 'End-user sign-off confirming satisfactory performance, operational handover, and site training completion.',
    keyFields: ['Client Officer Sign-off', 'Performance Validation', 'Training Confirmation', 'Acceptance Date'],
  },
  {
    slNo: 18,
    id: 'doc-project-handover',
    title: 'Project Handover Certificate',
    originalTitle: 'Poject Handover Ceritificate',
    code: 'AERIQ-DOC-018',
    stage: 'Stage 7: Handover & Acceptance',
    stageBadgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
    fileSize: '1.5 MB',
    version: 'v1.4',
    description: 'Formal document transferring operational control, maintenance manuals, and system access keys to client.',
    keyFields: ['Handover Manager', 'Asset Tag Ledger', 'Admin Credentials Handover', 'As-Built Drawings'],
  },
  {
    slNo: 19,
    id: 'doc-final-payment-receipt',
    title: 'Final Payment Receipt',
    originalTitle: 'Final Payment RTecipt',
    code: 'AERIQ-DOC-019',
    stage: 'Stage 8: Financial Settlement & Closure',
    stageBadgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    fileSize: '710 KB',
    version: 'v1.0',
    description: 'Finance department voucher acknowledging receipt of final balance and retention release funds.',
    keyFields: ['Voucher Ref', 'Total Contract Settled', 'Retention Release Amount', 'Zero Balance Clearance'],
  },
  {
    slNo: 20,
    id: 'doc-completion-closure-cert',
    title: 'Project Completion & Closure Certificate',
    originalTitle: 'Project Completion C Vlouser',
    code: 'AERIQ-DOC-020',
    stage: 'Stage 8: Financial Settlement & Closure',
    stageBadgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    fileSize: '1.8 MB',
    version: 'v2.0',
    description: 'Jointly signed master certificate declaring all contractual obligations successfully fulfilled.',
    keyFields: ['Project ID', 'Final Completion Date', 'Contract Compliance', 'Joint Signatures'],
  },
  {
    slNo: 21,
    id: 'doc-closure-report',
    title: 'Project Closure Report',
    originalTitle: 'Project Clouser Report',
    code: 'AERIQ-DOC-021',
    stage: 'Stage 8: Financial Settlement & Closure',
    stageBadgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    fileSize: '4.2 MB',
    version: 'v1.9',
    description: 'Comprehensive post-project evaluation report detailing schedule adherence, budget variance, and technical metrics.',
    keyFields: ['Project Summary', 'KPI Evaluation', 'Financial Variance', 'Lessons Learned', 'Archive Reference'],
  },
  {
    slNo: 22,
    id: 'doc-closure-approval',
    title: 'Project Closure Approval',
    originalTitle: 'Project Clouser Approval',
    code: 'AERIQ-DOC-022',
    stage: 'Stage 8: Financial Settlement & Closure',
    stageBadgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    fileSize: '890 KB',
    version: 'v1.0',
    description: 'Executive management board resolution authorizing formal project site release and document archiving.',
    keyFields: ['Board Resolution No', 'Executive Signatory', 'Archive Location', 'Decommissioning Date'],
  },
];

interface SettingsViewProps {
  user: AuthUser | null;
  onUpdateUser?: (updated: Partial<AuthUser>) => void;
}

function InteractiveMapPreview({ latitude, longitude, onChangeLocation }: InteractiveMapPreviewProps) {
  const mapContainerRef = React.useRef<HTMLDivElement>(null);
  const mapInstanceRef = React.useRef<any>(null);
  const markerInstanceRef = React.useRef<any>(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  const numLat = parseFloat(latitude) || 16.5449;
  const numLng = parseFloat(longitude) || 81.5212;

  // Dynamically load Leaflet library if not present
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    if ((window as any).L) {
      setLeafletLoaded(true);
      return;
    }

    if (!document.getElementById('leaflet-js')) {
      const script = document.createElement('script');
      script.id = 'leaflet-js';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => setLeafletLoaded(true);
      document.body.appendChild(script);
    }
  }, []);

  // Initialize and sync Leaflet map
  React.useEffect(() => {
    if (!leafletLoaded || !mapContainerRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: false,
      }).setView([numLat, numLng], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      // Custom marker icon with pin design
      const customIcon = L.divIcon({
        className: 'custom-interactive-marker',
        html: `<div style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;background:#10b981;border:3px solid #ffffff;border-radius:50%;box-shadow:0 8px 24px rgba(0,0,0,0.45);cursor:grab;">
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#09090b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
               </div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

      const marker = L.marker([numLat, numLng], {
        draggable: true,
        icon: customIcon,
      }).addTo(map);

      // Drag event handler
      marker.on('drag', (e: any) => {
        const { lat, lng } = e.target.getLatLng();
        onChangeLocation(lat.toFixed(4), lng.toFixed(4));
      });

      marker.on('dragend', (e: any) => {
        const { lat, lng } = e.target.getLatLng();
        onChangeLocation(lat.toFixed(4), lng.toFixed(4));
      });

      // Map click handler
      map.on('click', (e: any) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        onChangeLocation(lat.toFixed(4), lng.toFixed(4));
      });

      mapInstanceRef.current = map;
      markerInstanceRef.current = marker;
    } else {
      const map = mapInstanceRef.current;
      const marker = markerInstanceRef.current;
      const pos = marker.getLatLng();

      if (Math.abs(pos.lat - numLat) > 0.0001 || Math.abs(pos.lng - numLng) > 0.0001) {
        marker.setLatLng([numLat, numLng]);
        map.panTo([numLat, numLng], { animate: true });
      }
    }
  }, [leafletLoaded, numLat, numLng, onChangeLocation]);

  // Clean up
  React.useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-64 rounded-xl overflow-hidden border border-border bg-surface-secondary shadow-inner">
      {!leafletLoaded ? (
        <iframe
          title="Site Location Map Preview"
          className="w-full h-full border-0 filter contrast-[1.05]"
          loading="lazy"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${numLng - 0.02}%2C${numLat - 0.02}%2C${numLng + 0.02}%2C${numLat + 0.02}&layer=mapnik&marker=${numLat}%2C${numLng}`}
        />
      ) : (
        <div ref={mapContainerRef} className="w-full h-full z-0" />
      )}

      {/* Floating Glassmorphism Coordinate Badge */}
      <div className="absolute bottom-3 left-3 pointer-events-none z-10 px-3 py-1.5 rounded-lg bg-neutral-950/85 backdrop-blur-md border border-white/10 text-[11px] text-white flex items-center gap-2 shadow-elevated">
        <MapPin className="w-3.5 h-3.5 text-brand shrink-0 animate-bounce" />
        <span className="font-mono text-[10.5px] font-semibold tracking-wide">
          {numLat.toFixed(4)}° N, {numLng.toFixed(4)}° E
        </span>
      </div>

      <div className="absolute top-3 right-3 pointer-events-none z-10 px-2.5 py-1 rounded-md bg-neutral-950/70 backdrop-blur-md border border-white/10 text-[10px] text-neutral-300 font-medium">
        Click map or drag pin to adjust
      </div>
    </div>
  );
}

interface SettingsViewProps {
  user: AuthUser | null;
  onUpdateUser?: (updated: Partial<AuthUser>) => void;
}

function SaveCustomIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <g clipPath="url(#clip0_4418_8726)">
        <path
          d="M12.89 5.88086H5.11C3.4 5.88086 2 7.28086 2 8.99086V20.3509C2 21.8009 3.04 22.4209 4.31 21.7109L8.24 19.5209C8.66 19.2909 9.34 19.2909 9.75 19.5209L13.68 21.7109C14.96 22.4109 16 21.8009 16 20.3509V8.99086C16 7.28086 14.6 5.88086 12.89 5.88086Z"
        />
        <path
          d="M22.0001 5.11V16.47C22.0001 17.92 20.9601 18.53 19.6901 17.83L17.7601 16.75C17.6001 16.66 17.5001 16.49 17.5001 16.31V8.99C17.5001 6.45 15.4301 4.38 12.8901 4.38H8.82008C8.45008 4.38 8.19008 3.99 8.36008 3.67C8.88008 2.68 9.92008 2 11.1101 2H18.8901C20.6001 2 22.0001 3.4 22.0001 5.11Z"
        />
      </g>
      <defs>
        <clipPath id="clip0_4418_8726">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function SettingsView({ user, onUpdateUser }: SettingsViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<'general' | 'configuration' | 'documents' | 'security' | 'notifications'>('general');
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Document Management State
  const [docSearchQuery, setDocSearchQuery] = useState('');
  const [docStageFilter, setDocStageFilter] = useState<string>('All');
  const [selectedDocModal, setSelectedDocModal] = useState<CorporateDocument | null>(null);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const filteredDocuments = DOCUMENT_ITEMS.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
      doc.originalTitle.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
      doc.code.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(docSearchQuery.toLowerCase());
    const matchesStage = docStageFilter === 'All' || doc.stage === docStageFilter;
    return matchesSearch && matchesStage;
  });

  const handleDownloadDoc = (doc: CorporateDocument) => {
    const content = `================================================================================
AERIQ ADVANCED AQUACULTURE TECHNOLOGIES
CORPORATE GOVERNANCE & PROJECT MANAGEMENT SYSTEM
================================================================================

DOCUMENT TITLE  : ${doc.title.toUpperCase()}
DOCUMENT CODE   : ${doc.code}
RAS STAGE       : ${doc.stage}
VERSION         : ${doc.version}
FILE SIZE       : ${doc.fileSize}
STATUS          : APPROVED & OFFICIALLY ISSUED

DESCRIPTION:
${doc.description}

KEY DATA FIELDS & GOVERNANCE REQUIREMENTS:
${doc.keyFields.map((f, i) => `  ${i + 1}. ${f}`).join('\n')}

--------------------------------------------------------------------------------
CONFIDENTIALITY NOTICE:
This document contains proprietary information belonging to AERIQ / Venigem Advanced
Technologies. Any unauthorized review, distribution, or copying is strictly prohibited.
================================================================================
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.code}_${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadToast(`Downloading ${doc.code} (${doc.title})...`);
    setTimeout(() => {
      setDownloadToast(null);
    }, 4000);
  };

  // General profile form state
  const [generalData, setGeneralData] = useState({
    firstName: user?.firstName || (user?.fullName ? user.fullName.split(' ')[0] : 'Aqua'),
    lastName: user?.lastName || (user?.fullName && user.fullName.split(' ').length > 1 ? user.fullName.split(' ').slice(1).join(' ') : 'Operator'),
    companyName: user?.companyName || 'Venigem Advanced Technologies',
    mobileNumber: user?.mobileNumber || '+47 912 34 567',
    email: user?.email || 'operator@aqua-farms.no',
  });

  // Species & Production state
  const [selectedSpecies, setSelectedSpecies] = useState<'Murrel' | 'Vannamei Shrimp' | 'Mud Crab' | 'Other'>('Murrel');
  const [customSpecies, setCustomSpecies] = useState('');
  const [metricTonsPerYear, setMetricTonsPerYear] = useState('500');

  // Location state (Latitude & Longitude)
  const [latitude, setLatitude] = useState('16.5449');
  const [longitude, setLongitude] = useState('81.5212');
  const [isLocating, setIsLocating] = useState(false);

  const handleDetectLocation = () => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toFixed(4));
          setLongitude(position.coords.longitude.toFixed(4));
          setIsSaved(false);
          setIsLocating(false);
        },
        (error) => {
          console.warn('Geolocation error:', error);
          setLatitude('16.5449');
          setLongitude('81.5212');
          setIsSaved(false);
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
  };

  // Single-update restriction state
  const [hasUpdatedOnce, setHasUpdatedOnce] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('aeriq_settings_updated_once') === 'true';
    }
    return false;
  });
  const [showSupportModal, setShowSupportModal] = useState(false);

  // Load initial user settings from Cloud Firestore if available
  React.useEffect(() => {
    if (!user?.id) return;
    getUserSettingsFromFirestore(user.id).then((res) => {
      if (res.success && res.data) {
        const d = res.data;
        if (d.firstName || d.lastName) {
          setGeneralData((prev) => ({
            ...prev,
            firstName: d.firstName || prev.firstName,
            lastName: d.lastName || prev.lastName,
            companyName: d.companyName || prev.companyName,
            mobileNumber: d.mobileNumber || prev.mobileNumber,
            email: d.email || prev.email,
          }));
        }
        if (d.selectedSpecies) {
          setSelectedSpecies(d.selectedSpecies as any);
        }
        if (d.customSpecies) {
          setCustomSpecies(d.customSpecies);
        }
        if (d.metricTonsPerYear) {
          setMetricTonsPerYear(d.metricTonsPerYear);
        }
        if (d.latitude) {
          setLatitude(d.latitude);
        }
        if (d.longitude) {
          setLongitude(d.longitude);
        }
        if (d.hasUpdatedOnce !== undefined) {
          setHasUpdatedOnce(d.hasUpdatedOnce);
        }
      }
    });
  }, [user?.id]);

  const handleGeneralChange = (field: keyof typeof generalData, value: string) => {
    setGeneralData((prev) => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hasUpdatedOnce) {
      setShowSupportModal(true);
      return;
    }

    setIsSubmitting(true);
    const userId = user?.id || 'usr_default';
    const payload = {
      firstName: generalData.firstName,
      lastName: generalData.lastName,
      fullName: `${generalData.firstName} ${generalData.lastName}`.trim(),
      companyName: generalData.companyName,
      mobileNumber: generalData.mobileNumber,
      email: generalData.email,
      selectedSpecies,
      customSpecies,
      metricTonsPerYear,
      latitude,
      longitude,
      hasUpdatedOnce: true,
    };

    await saveUserSettingsToFirestore(userId, payload);

    setIsSubmitting(false);
    setIsSaved(true);
    setHasUpdatedOnce(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aeriq_settings_updated_once', 'true');
    }
    if (onUpdateUser) {
      onUpdateUser({
        firstName: generalData.firstName,
        lastName: generalData.lastName,
        fullName: `${generalData.firstName} ${generalData.lastName}`.trim(),
        companyName: generalData.companyName,
        mobileNumber: generalData.mobileNumber,
        email: generalData.email,
      });
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hasUpdatedOnce) {
      setShowSupportModal(true);
      return;
    }

    setIsSubmitting(true);
    const userId = user?.id || 'usr_default';
    const payload = {
      firstName: generalData.firstName,
      lastName: generalData.lastName,
      fullName: `${generalData.firstName} ${generalData.lastName}`.trim(),
      companyName: generalData.companyName,
      mobileNumber: generalData.mobileNumber,
      email: generalData.email,
      selectedSpecies,
      customSpecies,
      metricTonsPerYear,
      latitude,
      longitude,
      hasUpdatedOnce: true,
    };

    await saveUserSettingsToFirestore(userId, payload);

    setIsSubmitting(false);
    setIsSaved(true);
    setHasUpdatedOnce(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aeriq_settings_updated_once', 'true');
    }
  };

  const settingsMenu = [
    { id: 'general', label: 'General', icon: User },
    { id: 'configuration', label: 'Configuration', icon: Sliders },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'security', label: 'Security & Auth', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="space-y-5 animate-fade-in max-w-5xl mx-auto text-xs">
      {/* Ultra-Minimal Header */}
      <div className="pb-3 border-b border-border flex items-center justify-between">
        <h1 className="text-base font-semibold text-text-primary">Settings</h1>
      </div>

      {/* Sub-menu & Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Left Sub-Menu */}
        <div className="md:col-span-1">
          <nav className="space-y-1">
            {settingsMenu.map((item) => {
              const Icon = item.icon;
              const isActive = activeSubTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveSubTab(item.id as typeof activeSubTab);
                    setIsSaved(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left font-medium transition-all ${
                    isActive
                      ? 'bg-brand text-neutral-950 font-semibold shadow-subtle'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary/70'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-3 space-y-4">
          {/* General Profile View */}
          {activeSubTab === 'general' && (
            <div className="p-5 rounded-panel bg-surface border border-border shadow-card space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h2 className="font-semibold text-text-primary flex items-center gap-2">
                  <User className="w-4 h-4 text-brand" />
                  <span>General Profile</span>
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-status-success-bg text-status-success border border-status-success/20 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified</span>
                </span>
              </div>

              {isSaved && (
                <Alert
                  variant="success"
                  description="Saved"
                  onDismiss={() => setIsSaved(false)}
                />
              )}

              <form onSubmit={handleSaveGeneral} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FormField id="setting-firstName" label="First Name" required>
                    {({ id }) => (
                      <Input
                        id={id}
                        type="text"
                        value={generalData.firstName}
                        onChange={(e) => handleGeneralChange('firstName', e.target.value)}
                      />
                    )}
                  </FormField>

                  <FormField id="setting-lastName" label="Last Name" required>
                    {({ id }) => (
                      <Input
                        id={id}
                        type="text"
                        value={generalData.lastName}
                        onChange={(e) => handleGeneralChange('lastName', e.target.value)}
                      />
                    )}
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FormField id="setting-email" label="Work Email" required>
                    {({ id }) => (
                      <Input
                        id={id}
                        type="email"
                        value={generalData.email}
                        onChange={(e) => handleGeneralChange('email', e.target.value)}
                      />
                    )}
                  </FormField>

                  <FormField id="setting-mobileNumber" label="Mobile Number" required>
                    {({ id }) => (
                      <Input
                        id={id}
                        type="tel"
                        value={generalData.mobileNumber}
                        onChange={(e) => handleGeneralChange('mobileNumber', e.target.value)}
                      />
                    )}
                  </FormField>
                </div>

                <FormField id="setting-companyName" label="Company Name" required>
                  {({ id }) => (
                    <Input
                      id={id}
                      type="text"
                      value={generalData.companyName}
                      onChange={(e) => handleGeneralChange('companyName', e.target.value)}
                    />
                  )}
                </FormField>

                {/* Save Icon Only Button with Liquid Glass Tooltip */}
                <div className="pt-2 flex items-center justify-end">
                  <div className="relative group inline-block">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-label="Save"
                      className="w-10 h-10 rounded-xl bg-brand hover:bg-brand-hover active:scale-95 text-neutral-950 flex items-center justify-center shadow-subtle transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50"
                    >
                      <SaveCustomIcon className="w-5 h-5" />
                    </button>
                    {/* Liquid Glass Style Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none z-20 px-3 py-1 rounded-lg text-[11px] font-medium text-text-primary bg-white/30 dark:bg-black/50 backdrop-blur-xl border border-white/40 dark:border-white/20 shadow-elevated whitespace-nowrap">
                      Save
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Configuration View */}
          {activeSubTab === 'configuration' && (
            <div className="p-5 rounded-panel bg-surface border border-border shadow-card space-y-4">
              <div className="pb-3 border-b border-border">
                <h2 className="font-semibold text-text-primary flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-brand" />
                  <span>Configuration</span>
                </h2>
              </div>

              {isSaved && (
                <Alert
                  variant="success"
                  description="Saved"
                  onDismiss={() => setIsSaved(false)}
                />
              )}

              <form onSubmit={handleSaveConfig} className="space-y-4">
                <div className="space-y-2">
                  <label className="font-semibold text-text-primary block">
                    Fish Species
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'Murrel', label: 'Murrel' },
                      { id: 'Vannamei Shrimp', label: 'Vannamei Shrimp' },
                      { id: 'Mud Crab', label: 'Mud Crab' },
                      { id: 'Other', label: 'Other' },
                    ].map((species) => {
                      const isSelected = selectedSpecies === species.id;
                      return (
                        <button
                          key={species.id}
                          type="button"
                          onClick={() => {
                            setSelectedSpecies(species.id as typeof selectedSpecies);
                            setIsSaved(false);
                          }}
                          className={`p-3 rounded-lg border text-left transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-brand-subtle/50 border-brand ring-1 ring-brand/40 font-semibold'
                              : 'bg-surface hover:bg-surface-secondary border-border'
                          }`}
                        >
                          <span>{species.label}</span>
                          <div
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-brand bg-brand text-neutral-950' : 'border-border'
                            }`}
                          >
                            {isSelected && <div className="w-1 h-1 rounded-full bg-neutral-950" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedSpecies === 'Other' && (
                  <div className="p-3 rounded-lg bg-surface-secondary/60 border border-brand/30 animate-fade-in">
                    <FormField id="custom-species-input" label="What species?" required>
                      {({ id }) => (
                        <Input
                          id={id}
                          type="text"
                          value={customSpecies}
                          onChange={(e) => {
                            setCustomSpecies(e.target.value);
                            setIsSaved(false);
                          }}
                          placeholder="Species name"
                        />
                      )}
                    </FormField>
                  </div>
                )}

                <FormField id="metric-tons-input" label="Metric Ton Per Year (MT/year)">
                  {({ id }) => (
                    <Input
                      id={id}
                      type="number"
                      min="0"
                      value={metricTonsPerYear}
                      onChange={(e) => {
                        setMetricTonsPerYear(e.target.value);
                        setIsSaved(false);
                      }}
                      placeholder="e.g. 500"
                    />
                  )}
                </FormField>

                {/* Site Location & Interactive Map Preview */}
                <div className="pt-3 border-t border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-text-primary flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-brand" />
                      <span>Site Location Confirmation</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleDetectLocation}
                      disabled={isLocating}
                      className="text-[11px] font-medium text-brand hover:text-brand-hover flex items-center gap-1 bg-brand-subtle/40 px-2.5 py-1 rounded-md border border-brand/20 transition-colors disabled:opacity-50"
                    >
                      {isLocating ? (
                        <Loader2 className="w-3 h-3 animate-spin text-brand" />
                      ) : (
                        <Locate className="w-3 h-3" />
                      )}
                      <span>{isLocating ? 'Detecting...' : 'Detect Location'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FormField id="latitude-input" label="Latitude">
                      {({ id }) => (
                        <Input
                          id={id}
                          type="text"
                          value={latitude}
                          onChange={(e) => {
                            setLatitude(e.target.value);
                            setIsSaved(false);
                          }}
                          placeholder="e.g. 16.5449"
                        />
                      )}
                    </FormField>

                    <FormField id="longitude-input" label="Longitude">
                      {({ id }) => (
                        <Input
                          id={id}
                          type="text"
                          value={longitude}
                          onChange={(e) => {
                            setLongitude(e.target.value);
                            setIsSaved(false);
                          }}
                          placeholder="e.g. 81.5212"
                        />
                      )}
                    </FormField>
                  </div>

                  {/* Interactive Map Component */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-medium text-text-secondary flex items-center gap-1">
                        <Globe className="w-3 h-3 text-brand" />
                        <span>Map Preview</span>
                      </span>
                      <span className="text-[10px] text-text-muted font-mono">
                        {latitude || '0.0000'}°, {longitude || '0.0000'}°
                      </span>
                    </div>

                    <InteractiveMapPreview
                      latitude={latitude}
                      longitude={longitude}
                      onChangeLocation={(newLat, newLng) => {
                        setLatitude(newLat);
                        setLongitude(newLng);
                        setIsSaved(false);
                      }}
                    />
                  </div>
                </div>

                {/* Save Icon Only Button with Liquid Glass Tooltip */}
                <div className="pt-2 flex items-center justify-end">
                  <div className="relative group inline-block">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-label="Save"
                      className="w-10 h-10 rounded-xl bg-brand hover:bg-brand-hover active:scale-95 text-neutral-950 flex items-center justify-center shadow-subtle transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50"
                    >
                      <SaveCustomIcon className="w-5 h-5" />
                    </button>
                    {/* Liquid Glass Style Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none z-20 px-3 py-1 rounded-lg text-[11px] font-medium text-text-primary bg-white/30 dark:bg-black/50 backdrop-blur-xl border border-white/40 dark:border-white/20 shadow-elevated whitespace-nowrap">
                      Save
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Documents View - Ultra-Minimal Master Documents List */}
          {activeSubTab === 'documents' && (
            <div className="p-5 rounded-panel bg-surface border border-border shadow-card space-y-4">
              <div className="pb-3 border-b border-border">
                <h2 className="font-semibold text-text-primary flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand" />
                  <span>Documents</span>
                </h2>
              </div>

              {/* Minimal Documents Table */}
              <div className="rounded-xl border border-border overflow-hidden bg-surface-secondary/20">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-secondary/60 border-b border-border text-[11px] font-semibold text-text-secondary">
                      <th className="py-2.5 px-3.5 w-16 text-center">Sl No</th>
                      <th className="py-2.5 px-4">Document Name</th>
                      <th className="py-2.5 px-3.5 text-right w-36">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50 text-xs">
                    {DOCUMENT_ITEMS.map((doc) => (
                      <tr
                        key={doc.id}
                        className="hover:bg-surface-secondary/60 transition-colors"
                      >
                        <td className="py-2.5 px-3.5 text-center font-mono font-medium text-text-secondary">
                          {doc.slNo}
                        </td>
                        <td className="py-2.5 px-4 font-medium text-text-primary">
                          {doc.title}
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedDocModal(doc)}
                              title="View"
                              className="px-2.5 py-1.5 rounded-lg bg-surface-secondary hover:bg-brand/20 border border-border text-text-primary hover:text-brand transition-all flex items-center gap-1.5 text-[11px] font-medium"
                            >
                              <ViewCustomSvgIcon className="w-4 h-4 text-brand shrink-0" />
                              <span>View</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDownloadDoc(doc)}
                              title="Download"
                              className="px-2.5 py-1.5 rounded-lg bg-brand hover:bg-brand-hover text-neutral-950 transition-all flex items-center gap-1.5 text-[11px] font-semibold shadow-subtle active:scale-95 shrink-0"
                            >
                              <DownloadCustomSvgIcon className="w-4 h-4 text-neutral-950 shrink-0" />
                              <span>Download</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Security View */}
          {activeSubTab === 'security' && (
            <div className="p-5 rounded-panel bg-surface border border-border shadow-card space-y-4">
              <div className="pb-3 border-b border-border">
                <h2 className="font-semibold text-text-primary flex items-center gap-2">
                  <Lock className="w-4 h-4 text-brand" />
                  <span>Security</span>
                </h2>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-surface-secondary/40 border border-border flex items-center justify-between">
                  <span>Password</span>
                  <button type="button" className="px-3 py-1.5 rounded-full border border-border hover:bg-surface-secondary font-medium">
                    Update
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-surface-secondary/40 border border-border flex items-center justify-between">
                  <span>Two-Factor Auth</span>
                  <span className="text-status-success font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Enabled</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Notifications View */}
          {activeSubTab === 'notifications' && (
            <div className="p-5 rounded-panel bg-surface border border-border shadow-card space-y-4">
              <div className="pb-3 border-b border-border">
                <h2 className="font-semibold text-text-primary flex items-center gap-2">
                  <Bell className="w-4 h-4 text-brand" />
                  <span>Notifications</span>
                </h2>
              </div>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary/40 border border-border cursor-pointer">
                  <span>SMS Alerts</span>
                  <input type="checkbox" defaultChecked className="accent-brand w-4 h-4" />
                </label>
                <label className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary/40 border border-border cursor-pointer">
                  <span>Daily Reminders</span>
                  <input type="checkbox" defaultChecked className="accent-brand w-4 h-4" />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Glassmorphism Support Modal when Update Limit Reached */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-surface/95 border border-white/10 dark:border-white/20 shadow-elevated text-center space-y-4 animate-scale-up">
            <button
              type="button"
              onClick={() => setShowSupportModal(false)}
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary p-1 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-brand/10 border border-brand/20 text-brand flex items-center justify-center mx-auto shadow-subtle">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-semibold text-text-primary">
                Configuration Locked
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed max-w-sm mx-auto">
                Settings can only be updated <strong>once</strong>. To modify your profile, species selection, or site location again, please contact <strong>AERIQ Support</strong>.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <a
                href="mailto:support@aeriq.aero?subject=AERIQ%20Settings%20Update%20Request"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-neutral-950 font-semibold text-xs transition-all shadow-subtle active:scale-95"
              >
                <Headphones className="w-4 h-4" />
                <span>Contact AERIQ Support</span>
              </a>
              <button
                type="button"
                onClick={() => setShowSupportModal(false)}
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-border hover:bg-surface-secondary text-text-primary font-medium text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Corporate Document Viewing Modal */}
      {selectedDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-surface border border-white/10 dark:border-white/20 shadow-elevated overflow-hidden animate-scale-up">
            {/* Modal Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-surface-secondary/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand/10 border border-brand/20 text-brand flex items-center justify-center font-mono font-bold text-xs">
                  {String(selectedDocModal.slNo).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary text-sm">
                    {selectedDocModal.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-text-muted">
                    <span className="font-mono">{selectedDocModal.code}</span>
                    <span>•</span>
                    <span>{selectedDocModal.stage}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDocModal(null)}
                className="text-text-muted hover:text-text-primary p-1 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Document Preview */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              {/* Document Header Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-surface-secondary/50 border border-border">
                <div>
                  <span className="text-[10px] text-text-muted block">Document Version</span>
                  <span className="font-mono font-semibold text-text-primary">{selectedDocModal.version}</span>
                </div>
                <div>
                  <span className="text-[10px] text-text-muted block">File Size</span>
                  <span className="font-medium text-text-primary">{selectedDocModal.fileSize}</span>
                </div>
                <div>
                  <span className="text-[10px] text-text-muted block">Status</span>
                  <span className="text-status-success font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Approved</span>
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-text-muted block">Issuing Authority</span>
                  <span className="font-medium text-text-primary">AERIQ QA/QC</span>
                </div>
              </div>

              {/* Corporate Document Template Box */}
              <div className="p-5 rounded-xl border border-border bg-neutral-950 text-neutral-100 font-sans space-y-4 shadow-inner relative overflow-hidden">
                <div className="absolute right-4 top-4 opacity-5 pointer-events-none text-right">
                  <span className="text-6xl font-bold font-mono">AERIQ</span>
                </div>

                <div className="border-b border-neutral-800 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-brand flex items-center justify-center text-neutral-950 font-bold text-xs">
                      A
                    </div>
                    <span className="font-semibold text-sm tracking-wide text-white">
                      AERIQ CORPORATE GOVERNANCE
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-neutral-400">
                    CONFIDENTIAL
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-base font-bold text-brand">
                    {selectedDocModal.title}
                  </h4>
                  <p className="text-neutral-300 leading-relaxed text-xs">
                    {selectedDocModal.description}
                  </p>
                </div>

                {/* Key Fields Checklist */}
                <div className="pt-2">
                  <h5 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                    Mandatory Data Fields & Governance Criteria
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedDocModal.keyFields.map((field, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center gap-2 text-[11px] text-neutral-200"
                      >
                        <FileCheck className="w-3.5 h-3.5 text-brand shrink-0" />
                        <span>{field}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-border flex items-center justify-end gap-2 bg-surface-secondary/40">
              <button
                type="button"
                onClick={() => setSelectedDocModal(null)}
                className="px-4 py-2 rounded-xl border border-border hover:bg-surface-secondary text-text-primary font-medium text-xs transition-colors"
              >
                Close Preview
              </button>

              <button
                type="button"
                onClick={() => {
                  handleDownloadDoc(selectedDocModal);
                  setSelectedDocModal(null);
                }}
                className="px-4 py-2 rounded-xl bg-brand hover:bg-brand-hover text-neutral-950 font-semibold text-xs transition-all shadow-subtle flex items-center gap-1.5 active:scale-95"
              >
                <DownloadCustomSvgIcon className="w-4 h-4 text-neutral-950" />
                <span>Download Official Document</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
