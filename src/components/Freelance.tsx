import React from "react";

const Freelancing = () => {
  return (
    <section className="section">
      <div className="container">

        <h1 className="title has-text-centered">Freelancing Services</h1>
        <p className="subtitle has-text-centered">
          I help businesses build modern software and integrate AI-powered solutions.
        </p>

        <div className="columns is-multiline is-variable is-6">

          {/* Card 1 */}
          <div className="column is-4">
            <div className="box has-text-centered">
              <span className="icon is-large">
                <i className="fas fa-code fa-2x"></i>
              </span>
              <h2 className="title is-4">Full-Stack Development</h2>
              <p>
                Modern websites, backend APIs, dashboards, secure systems, 
                and end-to-end web applications.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="column is-4">
            <div className="box has-text-centered">
              <span className="icon is-large">
                <i className="fas fa-brain fa-2x"></i>
              </span>
              <h2 className="title is-4">AI + LLM Integration</h2>
              <p>
                Chatbots, workflow automation, embeddings, finetuning models,
                and custom AI features for your business.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="column is-4">
            <div className="box has-text-centered">
              <span className="icon is-large">
                <i className="fas fa-object-group fa-2x"></i>
              </span>
              <h2 className="title is-4">Web & UI Design</h2>
              <p>
                Clean landing pages, product UI, portfolio websites,
                and brand-aligned design systems.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="column is-4">
            <div className="box has-text-centered">
              <span className="icon is-large">
                <i className="fas fa-network-wired fa-2x"></i>
              </span>
              <h2 className="title is-4">System Design</h2>
              <p>
                Scalable architecture, cloud-ready design, and planning your
                backend & database for future growth.
              </p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="column is-4">
            <div className="box has-text-centered">
              <span className="icon is-large">
                <i className="fas fa-robot fa-2x"></i>
              </span>
              <h2 className="title is-4">Automation</h2>
              <p>
                AI agents, workflow automation, document processing,
                and time-saving tools tailored to your needs.
              </p>
            </div>
          </div>

          {/* Card 6 */}
          <div className="column is-4">
            <div className="box has-text-centered">
              <span className="icon is-large">
                <i className="fas fa-comments-dollar fa-2x"></i>
              </span>
              <h2 className="title is-4">Tech Consultation</h2>
              <p>
                Helping you plan your MVP, choose tech stacks,
                and understand how AI can elevate your business.
              </p>
            </div>
          </div>

        </div>


      </div>
    </section>
  );
};

export default Freelancing;
