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
                            <p>By using our services, you agree to these terms and conditions.</p>
                        </div>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                        >
                            2. Changes to Terms
                        </button>
                    </h2>
                    <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#termsAccordion"
                    >
                        <div className="accordion-body">
                            <p>We may modify these terms at any time, and your continued use of our services will signify your acceptance of the modified terms.</p>
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
                            3. User Responsibilities
                        </button>
                    </h2>
                    <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#termsAccordion"
                    >
                        <div className="accordion-body">
                            <p>You are responsible for your account and any activity that occurs under your account.</p>
                        </div>
                    </div>
                </div>

                {/* Section 4 */}
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
                            4. Prohibited Activities
                        </button>
                    </h2>
                    <div
                        id="collapseFour"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingFour"
                        data-bs-parent="#termsAccordion"
                    >
                        <div className="accordion-body">
                            <p>You agree not to engage in any prohibited activities, including but not limited to fraud, abuse, or harassment.</p>
                        </div>
                    </div>
                </div>

                {/* Section 5 */}
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
                            5. Termination
                        </button>
                    </h2>
                    <div
                        id="collapseFive"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingFive"
                        data-bs-parent="#termsAccordion"
                    >
                        <div className="accordion-body">
                            <p>We reserve the right to terminate your access to our services at our sole discretion.</p>
                        </div>
                    </div>
                </div>

                {/* Section 6 */}
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
                            6. Disclaimer of Warranties
                        </button>
                    </h2>
                    <div
                        id="collapseSix"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingSix"
                        data-bs-parent="#termsAccordion"
                    >
                        <div className="accordion-body">
                            <p>Our services are provided "as is" without warranty of any kind.</p>
                        </div>
                    </div>
                </div>

                {/* Section 7 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingSeven">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseSeven"
                            aria-expanded="false"
                            aria-controls="collapseSeven"
                        >
                            7. Limitation of Liability
                        </button>
                    </h2>
                    <div
                        id="collapseSeven"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingSeven"
                        data-bs-parent="#termsAccordion"
                    >
                        <div className="accordion-body">
                            <p>We are not liable for any indirect, incidental, or consequential damages arising from your use of our services.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
