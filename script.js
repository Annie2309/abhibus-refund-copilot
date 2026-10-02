const policies = {

    standard: {

        name: "Standard Policy",

        source:
            "Standardized refund policy — prototype model",

        rules: [

            {
                min: 0,
                max: 6,
                refund: 0,
                label: "0–6 hrs"
            },

            {
                min: 6,
                max: 12,
                refund: 30,
                label: "6–12 hrs"
            },

            {
                min: 12,
                max: 24,
                refund: 60,
                label: "12–24 hrs"
            },

            {
                min: 24,
                max: 1080,
                refund: 90,
                label: "24+ hrs"
            }

        ]

    },


    custom: {

        name: "Demo Operator",

        source:
            "Demo operator policy — for prototype testing",

        rules: [

            {
                min: 0,
                max: 6,
                refund: 0,
                label: "0–6 hrs"
            },

            {
                min: 6,
                max: 12,
                refund: 40,
                label: "6–12 hrs"
            },

            {
                min: 12,
                max: 24,
                refund: 70,
                label: "12–24 hrs"
            },

            {
                min: 24,
                max: 1080,
                refund: 90,
                label: "24+ hrs"
            }

        ]

    }

};



function renderPolicy() {

    const operator =
        document.getElementById(
            "operator"
        ).value;


    const policy =
        policies[operator];


    document.getElementById(
        "policySource"
    ).innerText =
        policy.source;


    const rules =
        document.getElementById(
            "policyRules"
        );


    rules.innerHTML = "";


    policy.rules.forEach(rule => {

        rules.innerHTML += `

            <div class="rule">

                <small>
                    ${rule.label}
                </small>

                <strong>
                    ${rule.refund}% back
                </strong>

            </div>

        `;

    });

}



function calculateRefund() {

    const operator =
        document.getElementById(
            "operator"
        ).value;


    const original =
        Number(
            document.getElementById(
                "originalFare"
            ).value
        );


    const paid =
        Number(
            document.getElementById(
                "paidFare"
            ).value
        );


    const departureValue =
        document.getElementById(
            "departure"
        ).value;



    if (
        !original ||
        !paid ||
        !departureValue
    ) {

        alert(
            "Please enter all booking details."
        );

        return;

    }



    if (original < paid) {

        alert(
            "Original ticket fare should be equal to or higher than the amount paid."
        );

        return;

    }



    const departure =
        new Date(
            departureValue
        );


    if (
        Number.isNaN(
            departure.getTime()
        )
    ) {

        alert(
            "Please enter a valid departure date and time."
        );

        return;

    }



    const now =
        new Date();


    const hours =
        (
            departure - now
        ) /
        (
            1000 * 60 * 60
        );



    if (hours <= 0) {

        alert(
            "The departure time must be in the future."
        );

        return;

    }



    const policy =
        policies[operator];


    let applicableRule =
        null;



    for (
        const rule of policy.rules
    ) {

        if (
            hours >= rule.min &&
            hours < rule.max
        ) {

            applicableRule =
                rule;

            break;

        }

    }



    if (!applicableRule) {

        alert(
            "No applicable refund policy found."
        );

        return;

    }



    /*
        Calculate the refund from the
        ORIGINAL / BASE FARE.

        Example:

        ₹1,000 fare
        60% refund

        = ₹600 base refund

        Then subtract the ₹15
        platform cancellation fee.
    */

    const baseRefund =
        original *
        applicableRule.refund /
        100;


    const platformFee =
        15;


    const finalRefund =
        Math.max(
            0,
            Math.min(
                paid,
                baseRefund - platformFee
            )
        );



    document.getElementById(
        "refundAmount"
    ).innerText =

        "₹" +
        Math.round(
            finalRefund
        ).toLocaleString(
            "en-IN"
        );



    document.getElementById(
        "paidDisplay"
    ).innerText =

        "₹" +
        Math.round(
            paid
        ).toLocaleString(
            "en-IN"
        );



    document.getElementById(
        "baseRefund"
    ).innerText =

        "₹" +
        Math.round(
            baseRefund
        ).toLocaleString(
            "en-IN"
        );



    document.getElementById(
        "status"
    ).innerText =

        applicableRule.refund +
        "% estimated refund";



    const roundedHours =
        Math.floor(
            hours
        );



    document.getElementById(
        "explanationText"
    ).innerText =

        `You are approximately ${roundedHours} hours ` +

        `before departure. The applicable ${policy.name} ` +

        `refund band is "${applicableRule.label}", ` +

        `which estimates that ${applicableRule.refund}% ` +

        `of the base fare is refundable. ` +

        `That gives an estimated base refund of ` +

        `₹${Math.round(
            baseRefund
        ).toLocaleString(
            "en-IN"
        )}. ` +

        `After the ₹15 platform cancellation fee, ` +

        `your estimated refund is ` +

        `₹${Math.round(
            finalRefund
        ).toLocaleString(
            "en-IN"
        )}.`;



    document.getElementById(
        "result"
    )
    .classList
    .remove(
        "hidden"
    );



    document.getElementById(
        "result"
    )
    .scrollIntoView({
        behavior: "smooth"
    });

}



document.getElementById(
    "operator"
)
.addEventListener(
    "change",
    renderPolicy
);



renderPolicy();



/*
    Automatically create a demo departure
    18 hours from now so the prototype
    works immediately when opened.
*/

const demoDeparture =
    new Date(
        Date.now() +
        18 *
        60 *
        60 *
        1000
    );


const localDate =
    new Date(
        demoDeparture.getTime() -

        demoDeparture.getTimezoneOffset()
        *
        60000
    )
    .toISOString()
    .slice(
        0,
        16
    );


document.getElementById(
    "departure"
).value =
    localDate;