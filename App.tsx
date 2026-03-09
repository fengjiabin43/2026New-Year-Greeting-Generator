  const handleGenerate = async () => {
    if (config.recipient === 'other' && !config.customRecipient?.trim()) {
      alert("请输入对方的称呼，让祝福更有温度哦！");
      return;
    }
    if (config.style === 'other' && !config.customStyle?.trim()) {
      alert("请输入您想要的祝福风格，比如：凡尔赛风、武侠风等。");
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const greeting = await generateNewYearGreeting(config);
      setResult(greeting);
    } catch (err) {
      console.error(err);
      alert("生成祝福语时遇到问题，请稍后再试！");
    } finally {
      setLoading(false);
    }
  };