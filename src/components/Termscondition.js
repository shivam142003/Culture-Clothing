import React from 'react';

export default function TermsAndServicesAccordion() {
    return (
        <div className="container">
            <h1 className="text-center">Terms and Services</h1>
            <div className="accordion" id="termsAccordion">
                {/* Section 1 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                        >
                            1. Acceptance of Terms
                        </button>
                    </h2>
                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#termsAccordion"
                    >
                        <div className="accordion-body">
                            <p>By using our services, you agree to these terms and conditions of Cultural Clothing.</p>
                        </div>
                    </div>
                </div>

              

                {/* Section 3 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                        >
                            2. User Responsibilities
                        </button>
                    </h2>
                    <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#termsAccordion"
                    >
                        <div className="accordion-body">
                            <p>You are responsible for your account and any activity that occurs under your account on the Cultural Clothing Website.</p>
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFour"
                            aria-expanded="false"
                            aria-controls="collapseFour"
                        >
                            3. Prohibited Activities
                        </button>
                    </h2>
                    <div
                        id="collapseFour"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingFour"
                        data-bs-parent="#termsAccordion"
                    >
                        <div className="accordion-body">
                            <p>You agree not to engage in any prohibited activities, including but not limited to fraud, abuse, or harassment related to Cultural Clothing.</p>
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFive">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFive"
                            aria-expanded="false"
                            aria-controls="collapseFive"
                        >
                            4. Termination
                        </button>
                    </h2>
                    <div
                        id="collapseFive"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingFive"
                        data-bs-parent="#termsAccordion"
                    >
                        <div className="accordion-body">
                            <p>Cultural Clothing reserves the right to terminate your access to our services at our sole discretion.</p>
                        </div>
                    </div>
                </div>

           
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingSix">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseSix"
                            aria-expanded="false"
                            aria-controls="collapseSix"
                        >
                            5. Disclaimer of Warranties
                        </button>
                    </h2>
                    <div
                        id="collapseSix"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingSix"
                        data-bs-parent="#termsAccordion"
                    >
                        <div className="accordion-body">
                            <p>Our services are provided "as is" without warranty of any kind, by Cultural Clothing.</p>
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    );
}

