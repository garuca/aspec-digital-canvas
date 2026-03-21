import { useEffect, useRef, useState } from "react";
import { Code2, Palette, TrendingUp, Linkedin, Mail, Sparkles, Award, Heart, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface TeamMember {
  name: string;
  roleKey: string;
  descKey: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  image: string;
}

const floatingElements = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  duration: `${3 + Math.random() * 4}s`,
  delay: `${Math.random() * 3}s`,
}));

const teamStars = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2 + 0.5,
  delay: `${Math.random() * 4}s`,
  duration: `${2 + Math.random() * 3}s`,
}));

const TeamSection = () => {
  const basePath = typeof window !== "undefined" && window.location.pathname.startsWith("/aspec-digital-canvas") ? "/aspec-digital-canvas" : "";
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const team: TeamMember[] = [
    {
      name: "Gabriel Rufino",
      roleKey: "team.tech",
      descKey: "team.gabriel.desc",
      icon: Code2,
      color: "#06B6D4",
      gradient: "from-cyan-500/20 to-blue-500/20",
      image: `${basePath}/portfolio/team/gabriel.jpg`,
    },
    {
      name: "Weliton Mendanha",
      roleKey: "team.design",
      descKey: "team.weliton.desc",
      icon: Palette,
      color: "#D946EF",
      gradient: "from-pink-500/20 to-purple-500/20",
      image: `${basePath}/portfolio/team/weliton.jpg`,
    },
    {
      name: "Leonardo Silva",
      roleKey: "team.commercial",
      descKey: "team.leonardo.desc",
      icon: TrendingUp,
      color: "#22C55E",
      gradient: "from-green-500/20 to-emerald-500/20",
      image: `${basePath}/portfolio/team/leonardo.jpg`,
    },
  ];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
      <section id="team" ref={sectionRef} className="relative pt-8 pb-32 overflow-hidden scroll-mt-20">
      <div className="dark-grid-pattern" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-950/10 to-background" />
      
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Galaxy glow effects */}
        <div className="galaxy-glow top-1/3 -left-48" />
        <div className="galaxy-glow bottom-1/3 -right-48" />
        
        {/* Orbit rings */}
        <div className="orbit-ring" style={{ 
          width: "200px", 
          height: "200px", 
          top: "15%", 
          right: "8%", 
          border: "1px solid rgba(217, 70, 239, 0.06)",
          borderRadius: "50%",
          animation: "orbit-spin 45s linear infinite"
        }} />
        
        {/* Stars */}
        {teamStars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-white animate-[twinkle_var(--dur)_ease-in-out_var(--delay)_infinite]"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              "--delay": star.delay,
              "--dur": star.duration,
            } as React.CSSProperties}
          />
        ))}

        {/* Floating particles */}
        {floatingElements.map((el) => (
          <div
            key={el.id}
            className="absolute rounded-full animate-float opacity-30"
            style={{
              width: el.size,
              height: el.size,
              top: el.top,
              left: el.left,
              background: "linear-gradient(135deg, #D946EF, #5B2EFF)",
              animationDuration: el.duration,
              animationDelay: el.delay,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className={`text-center mt-20 mb-12 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full px-5 py-2 mb-6 border border-pink-500/30">
            <Sparkles size={14} className="text-pink-400" />
            <span className="text-sm font-medium text-pink-300">{t("team.badge")}</span>
          </div>
          <h2 className="font-exo font-bold text-4xl sm:text-5xl mb-4 text-white">
            {t("team.title")}
          </h2>
          <p className="font-exo text-lg text-gray-400 max-w-2xl mx-auto">
            {t("team.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={`team-card group transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              <div
                className={`team-card-inner relative rounded-3xl overflow-hidden p-8 transition-all duration-500`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient}`} />
                <div 
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 blur-3xl"
                  style={{ background: member.color }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Avatar with Photo */}
                  <div className="relative mb-6">
                    <div className="team-avatar-wrapper">
                      <div 
                        className="team-avatar-ring"
                        style={{ 
                          background: `linear-gradient(135deg, ${member.color}, ${member.color}80)`,
                          boxShadow: `0 0 30px ${member.color}40`
                        }}
                      />
                      <div className="team-avatar">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="team-avatar-image"
                        />
                        <div className="team-avatar-overlay" />
                      </div>
                    </div>
                  </div>

                  {/* Name & Role */}
                  <h3 className="font-exo font-bold text-2xl text-white mb-2">
                    {member.name}
                  </h3>
                  <div 
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                    style={{ 
                      background: `${member.color}20`,
                      border: `1px solid ${member.color}40`
                    }}
                  >
                    <member.icon size={14} style={{ color: member.color }} />
                    <span className="text-sm font-medium" style={{ color: member.color }}>
                      {t(member.roleKey)}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="font-exo text-gray-400 text-sm leading-relaxed mb-6">
                    {t(member.descKey)}
                  </p>

                  {/* Decorative Elements */}
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-1 rounded-full"
                      style={{ background: member.color }}
                    />
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ background: member.color, opacity: 0.5 }}
                    />
                    <div 
                      className="w-8 h-1 rounded-full"
                      style={{ background: member.color }}
                    />
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-16 h-16">
                  <div 
                    className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ borderColor: member.color }}
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16">
                  <div 
                    className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ borderColor: member.color }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className={`mt-20 transition-all duration-1000 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: Award, labelKey: "team.exp", value: "10+" },
              { icon: Heart, labelKey: "team.projects", value: "150+" },
              { icon: Zap, labelKey: "team.clients", value: "50+" },
            ].map((stat, index) => (
              <div 
                key={index}
                className="flex items-center gap-3"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, rgba(217, 70, 239, 0.2), rgba(91, 46, 255, 0.2))" }}
                >
                  <stat.icon size={24} className="text-purple-400" />
                </div>
                <div>
                  <div className="font-exo font-bold text-2xl text-white">{stat.value}</div>
                  <div className="font-exo text-xs text-gray-500">{t(stat.labelKey)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none" 
        style={{ background: "#D946EF" }} />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "#5B2EFF" }} />
    </section>
  );
};

export default TeamSection;
