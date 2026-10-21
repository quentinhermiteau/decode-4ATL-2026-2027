"use client";

export default function Exo4() {
  const handleChange = (event) => {
    console.log(event.target.value);
    if (event.target.value.length > 10) {
      alert("Taille maximum dépassée.");
    }
  };

  return (
    <>
      <div id="notice">
        <p>
          Modifie ce code pour que lorsque tu rajoutes une lettre dans l'input,
          la longueur de l'input est vérifiée.
        </p>
        <p>
          Si l'input dépase les 10 caractères affichés une alerte qui indique
          que la taille maximum est dépassée.
        </p>
      </div>
      <section>
        <h1>Character Limit</h1>
        <input placeholder="Enter some text" onChange={handleChange} />
      </section>
    </>
  );
}
