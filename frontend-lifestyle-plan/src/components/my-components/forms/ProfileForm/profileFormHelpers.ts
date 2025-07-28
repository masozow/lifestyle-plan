  export const getUnit = (field: string, unitSystem: string) => {
    if (field === "weight") return unitSystem === "metric" ? "kg" : "lbs";
    if (field === "height") return unitSystem === "metric" ? "cm" : "inches";
    // if (field === "age") return "";
    return unitSystem === "metric" ? "cm" : "inches";
  };