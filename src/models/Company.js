const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/database/database-client');

const CustomerCompanies = sequelize.define('customer_companies', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false, // Company name is required
    },
    taxNumber: {
        type: DataTypes.STRING,
        allowNull: false, // Tax number is required
    },
    location: {
        type: DataTypes.JSONB, // Store location details in JSONB format
        allowNull: false, // Location is required
        defaultValue: {
            province: null,
            country: null,
            postcode: null,
            road: null,
            building: null,
        },
    },
    contactChannels: {
        type: DataTypes.JSONB, // Store contact details (like email, phone) in JSONB format
        allowNull: true, // Optional, but can be provided
        defaultValue: {
            emails: [],
            phoneNumbers: [],
        },
    },
    companyPackage: {
        type: DataTypes.ENUM('starter', 'corporation', 'organisation'), // Updated company package options
        allowNull: false,
        defaultValue: 'starter', // Default to the "starter" package
    },
    companyLogoUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'https://cdn-icons-png.flaticon.com/512/15536/15536912.png', // Default logo URL
    },
}, {
    tableName: 'customer_companies', // Name of the table
    timestamps: true, // Automatically handle 'createdAt' and 'updatedAt'
    underscored: true, // Use underscored naming convention for columns
});

module.exports = CustomerCompanies;
