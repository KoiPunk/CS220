let Ghost = function() {
  const value = Math.random() * 100;

  if (value > 75)
    this.color = "white";
  else if (value > 50)
    this.color = "purple"
  else if (value > 25)
    this.color = "yellow"
  else 
    this.color = "red"
};