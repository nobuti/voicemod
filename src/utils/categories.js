export default (voices) => {
  const categories = voices.reduce((memo, voice) => {
    return voice.tags != null ? memo.concat(voice.tags) : memo;
  }, []);

  const unique = [...new Set(categories)].map((c) => ({ label: c, value: c }));
  return [{ label: "All", value: "all" }].concat(unique);
};
