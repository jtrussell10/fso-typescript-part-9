// services/diagnostics.js

export const getDiagnosisInfo = async (code: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/diagnoses/${code}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch diagnosis info", error);
    }
  };
  