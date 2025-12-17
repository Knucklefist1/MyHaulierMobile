import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../styles/screens/HaulierProfileSetupScreenStyles';

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <View style={styles.stepIndicator}>
      {steps.map((step) => {
        const isActive = step.number === currentStep;
        const isCompleted = step.number < currentStep;
        
        return (
          <View key={step.number} style={styles.stepContainer}>
            <View style={[
              styles.stepCircle,
              (isActive || isCompleted) && styles.activeStepCircle
            ]}>
              <Text style={[
                styles.stepNumber,
                (isActive || isCompleted) && styles.activeStepNumber
              ]}>
                {isCompleted ? '✓' : step.number}
              </Text>
            </View>
            <Text style={[
              styles.stepTitle,
              isActive && styles.activeStepTitle
            ]}>
              {step.title}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default StepIndicator;

