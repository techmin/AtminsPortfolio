import React, { Component } from "react";

interface ContactFormState {
  name: string;
  email: string;
  message: string;
  status: "" | "sending" | "success" | "error";
}

class ContactForm extends Component<{}, ContactFormState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: "",
      status: "",
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof ContactFormState;
    const value = e.target.value;
    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    this.setState({ status: "sending" });

    try {
      const response = await fetch("https://formspree.io/f/xyzlkjvw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          message: this.state.message,
        }),
      });

      if (response.ok) {
        this.setState({
          name: "",
          email: "",
          message: "",
          status: "success",
        });
      } else {
        this.setState({ status: "error" });
      }
    } catch {
      this.setState({ status: "error" });
    }
  };

  render() {
    return (
      <div className="container" style={{ maxWidth: "500px" }}>
        <h2 className="title is-4">Contact Me</h2>

        <form onSubmit={this.handleSubmit}>

          {/* Name */}
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="name"
                placeholder="Your Name"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Your Email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>

          {/* Message */}
          <div className="field">
            <label className="label">Message</label>
            <div className="control">
              <textarea
                className="textarea"
                name="message"
                placeholder="Your Message"
                rows={5}
                value={this.state.message}
                onChange={this.handleChange}
                required
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="field">
            <div className="control">
              <button
                className="button is-link"
                type="submit"
                disabled={this.state.status === "sending"}
              >
                {this.state.status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>
        </form>

        {/* Messages */}
        {this.state.status === "success" && (
          <p className="has-text-success" style={{ marginTop: "10px" }}>
            Message sent successfully! 🎉
          </p>
        )}
        {this.state.status === "error" && (
          <p className="has-text-danger" style={{ marginTop: "10px" }}>
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    );
  }
}

export default ContactForm;
