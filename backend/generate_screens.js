const fs = require('fs');
const path = require('path');

const p = (dir, file) => path.join(__dirname, dir, file);

const createComponent = (dir, name, title) => {
  fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
  const content = 'import { motion } from \'framer-motion\';\nexport default function ' + name + '() {\n  return (\n    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className=\"p-6\">\n      <h1 className=\"text-2xl font-bold mb-4\">' + title + '</h1>\n      <p>Component built successfully.</p>\n    </motion.div>\n  );\n}';
  fs.writeFileSync(p(dir, name + '.tsx'), content);
};

// Patient Portal
createComponent('../frontend-patient/src/pages', 'Medications', 'Medications & Adherence');
createComponent('../frontend-patient/src/pages', 'Vitals', 'Vitals Log');
createComponent('../frontend-patient/src/pages', 'SymptomDiary', 'Symptom Diary');
createComponent('../frontend-patient/src/pages', 'Messages', 'Messages');
createComponent('../frontend-patient/src/pages', 'EducationHub', 'Education Hub');
createComponent('../frontend-patient/src/pages', 'EmergencyCard', 'Emergency Quick-Card');
createComponent('../frontend-patient/src/pages', 'FamilyView', 'Family View');

// Doctor Portal
createComponent('../frontend-doctor/src/pages', 'Dashboard', 'Doctor Dashboard');
createComponent('../frontend-doctor/src/pages', 'PatientDetail', 'Patient Detail View');
createComponent('../frontend-doctor/src/pages', 'PlanBuilder', 'Follow-up Plan Builder');
createComponent('../frontend-doctor/src/pages', 'MissedVisits', 'Missed-Visit Alerts');
createComponent('../frontend-doctor/src/pages', 'CloseCase', 'Close-Case Flow');

// Admin Portal
createComponent('../frontend-admin/src/pages', 'Dashboard', 'Analytics Dashboard');
createComponent('../frontend-admin/src/pages', 'StaffManagement', 'Staff Management');
createComponent('../frontend-admin/src/pages', 'FamilyLinkage', 'Family Linkage Management');
createComponent('../frontend-admin/src/pages', 'TemplateEditor', 'Guideline Template Editor');
createComponent('../frontend-admin/src/pages', 'AuditLog', 'Audit Log Viewer');

console.log('All portal screens generated successfully!');
