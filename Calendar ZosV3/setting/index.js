AppSettingsPage({
  build(props) {
    const AppName = Section({
      description: 'School Calendar:',
      style: {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: '40px',
        marginBottom: '8px', // Reducido espacio entre el título y la imagen
        textAlign: 'center',
        fontFamily: 'Georgia, serif',
      },
    });

    const img = Image({
src: "data:image/png;base64, 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",
      style: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
      }
    });

    const Version = Section({
      description: 'V 4.3.5',
      style: {
        color: '#777777',
        fontWeight: 'normal',
        fontSize: '16px',
        marginBottom: '16px', // Menos espacio en la versión
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
      },
    });

    const sectionStyle = {
      color: "#444444",
      fontSize: "18px",
      padding: "8px 0",  // Menos padding en cada sección
      lineHeight: "1.6",
      borderBottom: "2px solid #f0f0f0",
      fontFamily: 'Helvetica, sans-serif',
    };

    const About = Section({
      description: 'About:',
      style: {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: '28px',
        marginBottom: '12px', // Reducido espacio
        textAlign: 'center',
        fontFamily: 'Georgia, serif',
      },
    });

    const descriptionSection = Section({
      description:
        "This application for Amazfit allows you to manage your school calendar directly from your smartwatch. It is ideal for students who need to stay organized with events, schedules, and tasks.",
      style: {
        ...sectionStyle,
        borderBottom: "2px solid #1db954", // Línea destacada para la primera sección
        fontStyle: 'italic',
      },
    });

    const Features = Section({
      description: 'Features:',
      style: {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: '28px',
        marginBottom: '12px', // Reducido espacio
        textAlign: 'center',
        fontFamily: 'Georgia, serif',
      },
    });

    const featureStyle = {
      ...sectionStyle,
      marginBottom: '12px',  // Menos espacio entre funciones
      paddingLeft: '20px',  // Mantiene la indentación para claridad
    };

    const features = [
      '• School schedule visualization.',
      '• Calculate subjects\' average with data and percentages provided by the user.',
      '• Adding tasks or exams deadlines and visualizing them quickly.',
      '• Ask the app to remind you of a project or task deadline.',
    ];
let intP = -1
    const featureSections = features.map((feature, index) => {
      intP++
      return Section({
        title: feature,
        titleStyle: {
          fontSize: "20px",
          fontWeight: "normal",
          color: "#1db954", 
          marginBottom: "6px", // Menos espacio entre título y contenido
          fontFamily: 'Arial, sans-serif',
        },
        style: intP < 3 ? featureStyle : {
          ...featureStyle,
          borderBottom: "2px solid #1db954", // Línea destacada para la primera sección
        },
      });
    });

    const HowTo = Section({
      description: 'User Guide:',
      style: {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: '28px',
        marginBottom: '12px', // Reducido espacio
        textAlign: 'center',
        fontFamily: 'Georgia, serif',
      },
    });

    const usageInstructions = [
      '• Follow the guide provided in smartwatch to configure the app.',
      '• Add any task or event.',
      '• Any grade? Add it on the grades page.',
      '• Customize the app by going to the configuration section.',
    ];
let int = -1
    const usageSections = usageInstructions.map((instruction, index) => {
      int++
      return Section({
        title: instruction,
        titleStyle: {
          fontSize: "20px",
          fontWeight: "normal",
          color: "#1db954", 
          marginBottom: "6px", // Menos espacio entre título y contenido
          fontFamily: 'Arial, sans-serif',
        },
        style: int < 3 ? featureStyle : {
          ...featureStyle,
          borderBottom: "2px solid #1db954", // Línea destacada para la primera sección
        },
      });
    });

    const Author = Section({
      description: '@FlvLujU Apps',
      style: {
        color: '#333333',
        fontWeight: 'normal',
        fontSize: '18px',
        marginBottom: '12px', // Reducido espacio
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
      },
    });

    const contactMe = Section({
      description: 'Email: flvluju@gmail.com',
      style: {
        color: '#777777',
        fontSize: '18px',
        marginBottom: '12px', // Reducido espacio
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
      },
    });
    const reason = Section({
      description: "Contact me for any feedback, bugs, or proposals related to any of my apps.",
      style: {
        color: '#999999',
        fontSize: '18px',
        marginBottom: '12px', // Reducido espacio
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
      },
    });

    return View(
      {
        style: {
          padding: "30px", // Reducido padding general para mayor compactación
          backgroundColor: "#f9f9f9", 
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        },
      },
      [
        AppName, img, Version, About, descriptionSection,
        Features, ...featureSections, HowTo, ...usageSections, Author, contactMe, reason
      ]
    );
  },
});

