const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HeaderSchema = new Schema({
  _id: false,
  department: {
    type: String,
    
  },
  personInCharge1: {
    type: String,
   
  },
  headerDate: {
    type: String,
    
  },
});

const DurationPermit = new Schema({
  _id: false,
  dateStart: {
    type: Date,
    
  },
  dateEnd: {
    type: Date,
    
  },
  timeStart: {
    type: Number,
    require: true,
  },
  timeEnd: {
    type: Number,
    
  },
});

// Basic info Schema
const BasicInfoSchema = new Schema({
  _id: false,
  activityDescription: {
    type: String,
    
  },
  entrySpace: {
    type: String,
    
  },
  personInCharge2: {
    type: String,
    
  },
  permitno: {
    type: Number,
  },
  jobLocation: {
    type: String,
    
  },
  durationPermit: DurationPermit,
});

const AuthorizedAttendants = new Schema({
  _id: false,
  aaName1: {
    type: String,
    
  },
  aaPhone1: {
    type: Number,
    
  },
  aaName2: {
    type: String,
    
  },
  aaPhone2: {
    type: Number,
    
  },
});

const AuthorizedEntrants = new Schema({
  _id: false,
  aeName1: {
    type: String,
    
  },
  aePhone1: {
    type: Number,
    
  },
  aeName2: {
    type: String,
    
  },
  aePhone2: {
    type: Number,
    
  },
});

const RescueTeam = new Schema({
  _id: false,
  rtName1: {
    type: String,
    
  },
  rtPhone1: {
    type: Number,
    
  },
  rtName2: {
    type: String,
    
  },
  rtPhone2: {
    type: Number,
    
  },
});

const PersonnelSchema = new Schema({
  _id: false,
  authorizedAttendants: AuthorizedAttendants,
  authorizedEntrants: AuthorizedEntrants,
  rescueTeam: RescueTeam,
});

const IsolationSchema = new Schema({
  _id: false,
  isolate: {
    type: String,
    
  },
  device: {
    type: String,
    
  },
  mechanical: {
    type: String,
  },
  naturalVentilationOnly: {
    type: String,
  },
});

const HazardSchema = new Schema({
  _id: false,
  toxicAtmosphere: {
    type: Boolean,
    default: false,
  },
  engulfment: {
    type: Boolean,
    default: false,
  },
  mechanicalHazards: {
    type: Boolean,
    default: false,
  },
  heat: {
    type: Boolean,
    default: false,
  },
  o2Deficient: {
    type: Boolean,
    default: false,
  },
  asphyxiationEntrapment: {
    type: Boolean,
    default: false,
  },
  pressurizedWater: {
    type: Boolean,
    default: false,
  },
  other: {
    type: Boolean,
    default: false,
  },
  otherText: {
    type: String,
  },
  initial: {
    type: String,
  },
  isolationSchema: IsolationSchema,
});

const EquipmentSchema = new Schema({
  _id: false,
  directReadingGasMonitor: {
    type: String,
  },
  hoistingEquipment: {
    type: String,
  },
  entryStand: {
    type: String,
  },
  electricEqui: {
    type: String,
  },
  class: {
    type: String,
  },
  safetyHarness: {
    type: String,
  },
  poweredCommunication: {
    type: String,
  },
  protectedClothing: {
    type: String,
  },
  ventilationSystem: {
    type: String,
  },
});

// incomplete
const TestingRecordSchema = new Schema({
  _id: false,
  permitReclassify: {
    type: Boolean,
    default: false,
  },
});

const PermitPrepared = new Schema({
  _id: false,
  ppName: {
    type: String,
    
  },
  ppSignature: {
    type: String,
  },
  ppDate: {
    type: Date,
    
  },
  ppTime: {
    type: Number,
    
  },
});

const PermitApproved = new Schema({
  _id: false,
  paName: {
    type: String,
    
  },
  paSignature: {
    type: String,
  },
  paDate: {
    type: Date,
    
  },
  paTime: {
    type: Number,
    
  },
});

const ReviewHead = new Schema({
  _id: false,
  rhName: {
    type: String,
    
  },
  rhSignature: {
    type: String,
  },
  rhDate: {
    type: Date,
    
  },
  rhTime: {
    type: Number,
    
  },
});

const OrganizationSchema = new Schema({
  _id: false,
  precaution: {
    type: Boolean,
    default: false,
  },
  permitPrepared: PermitPrepared,
  permitApproved: PermitApproved,
  reviewHead: ReviewHead,
});

const PermitCloseSchema = new Schema({
  _id: false,
  permissionWithdraw: {
    type: Boolean,
    default: null,
  },
});

const FormSchema = new Schema({
  header: HeaderSchema,
  part1: BasicInfoSchema,
  part2: PersonnelSchema,
  part3: HazardSchema,
  part5: EquipmentSchema,
  part6: TestingRecordSchema,
  part7: OrganizationSchema,
  part8: PermitCloseSchema,
});

// const Form = mongoose.model("form", FormSchema);
const Form = mongoose.model("Header", FormSchema);
module.exports = Form;
