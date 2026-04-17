const form = document.getElementById("formDepense");
const liste = document.getElementById("liste");

async function charger() {
    const res = await fetch("http://localhost:3000/depenses");
    const data = await res.json();

    liste.innerHTML = "";

    let total = 0;

    data.forEach(d => {

        total += d.montant;

        const div = document.createElement("div");
        div.classList.add("expense");

        div.innerHTML = `
            <div>
                <strong>${d.categorie}</strong><br>
                <small>${d.date}</small><br>
                <small>${d.description}</small>
            </div>
            <div>${d.montant} FCFA</div>
        `;

        liste.appendChild(div);
    });

    document.getElementById("total").textContent = total + " FCFA";
    document.getElementById("count").textContent = data.length;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const depense = {
        categorie: categorie.value,
        montant: montant.value,
        date: date.value,
        description: description.value
    };

    await fetch("http://localhost:3000/depenses", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(depense)
    });

    form.reset();
    charger();
});

charger();
