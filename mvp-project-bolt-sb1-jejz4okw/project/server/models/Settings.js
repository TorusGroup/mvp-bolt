import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Settings = sequelize.define('Settings', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  openaiToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  systemPrompt: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  assistantPrompt: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

export default Settings;