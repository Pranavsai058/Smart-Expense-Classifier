function PredictionCard({ prediction }){

  return(

    <div style={{marginTop:"20px"}}>

      <h2>Predicted Next Month Spending</h2>

      {prediction && (
        <h3>₹{Math.round(prediction)}</h3>
      )}

    </div>

  )

}

export default PredictionCard