"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, MessageSquare, Send, MailCheck } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Message sent successfully! We'll get back to you soon.");
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-zinc-400 max-w-2xl">
            Have questions about our AI player analysis platform? Reach out to our team and we'll be happy to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            {isSubmitted ? (
              <div className="bg-zinc-950 rounded-xl p-8 border border-zinc-800 h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-green-600/20 flex items-center justify-center mb-4">
                  <MailCheck className="h-8 w-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Message Sent!</h2>
                <p className="text-zinc-400 mb-6 max-w-md">
                  Thank you for reaching out. Our team will review your message and get back to you as soon as possible.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <div className="bg-zinc-950 rounded-xl p-6 md:p-8 border border-zinc-800">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-red-500" />
                  Send Us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-zinc-400 mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    >
                      <option value="" disabled>Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="demo">Request a Demo</option>
                      <option value="pricing">Pricing Information</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-red-500 resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 justify-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-zinc-950 rounded-xl p-6 border border-zinc-800">
              <h2 className="text-xl font-bold text-white mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center text-red-500 flex-shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm text-zinc-400 mb-1">Email Us</h3>
                    <p className="text-white font-medium">support@aiplayeranalysis.com</p>
                    <p className="text-white font-medium">info@aiplayeranalysis.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center text-red-500 flex-shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm text-zinc-400 mb-1">Call Us</h3>
                    <p className="text-white font-medium">+1 (555) 123-4567</p>
                    <p className="text-white font-medium">+1 (555) 987-6543</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center text-red-500 flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm text-zinc-400 mb-1">Location</h3>
                    <p className="text-white font-medium">
                      123 Innovation Drive<br />
                      Suite 400<br />
                      San Francisco, CA 94103
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-950 rounded-xl p-6 border border-zinc-800">
              <h2 className="text-xl font-bold text-white mb-4">Business Hours</h2>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Monday - Friday</span>
                  <span className="text-white">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Saturday</span>
                  <span className="text-white">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Sunday</span>
                  <span className="text-white">Closed</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-800">
                <p className="text-zinc-400 text-sm">
                  Technical support is available 24/7 for emergency issues.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How long does video processing take?",
                answer: "Video processing typically takes 5-15 minutes depending on the length and quality of the video."
              },
              {
                question: "What video formats are supported?",
                answer: "We support all major video formats including MP4, MOV, and AVI. For best results, we recommend MP4 with H.264 encoding."
              },
              {
                question: "Is my data secure?",
                answer: "Yes, we take data security seriously. All uploads are encrypted and we never share your data with third parties."
              },
              {
                question: "Can I track multiple teams?",
                answer: "Absolutely! Our platform allows you to track and analyze multiple teams and players within your account."
              },
              {
                question: "Do you offer team discounts?",
                answer: "Yes, we offer special pricing for teams and organizations. Contact our sales team for more information."
              },
              {
                question: "Can I export the analysis data?",
                answer: "Yes, all analysis data can be exported in various formats including PDF, CSV, and Excel."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-zinc-950 rounded-xl p-6 border border-zinc-800">
                <h3 className="text-lg font-bold text-white mb-2">{faq.question}</h3>
                <p className="text-zinc-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
