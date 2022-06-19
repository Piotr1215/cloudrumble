import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
<iframe src="https://ghbtns.com/github-btn.html?user=webdriverio&amp;repo=webdriverio&amp;type=watch&amp;count=true" height="20" width="118" frameBorder="0" scrolling="0" style={{ width: '118px', height: '20px' }}></iframe>
const FeatureList = [
  {
    title: 'Medium Blogs',
    Svg: require('../../static/img/undraw_blog.svg').default,
    description: (
      <>
        Check out my blogs on <a href="https://piotrzan.medium.com/">Medium</a>.
        Topics: Cloud-native, Infrastructure, Software Architecture and more!
      </>
    ),
  },
  {
    title: 'Killercoda Scenarios',
    Svg: require('../../static/img/katacoda.svg').default,
    description: (
      <>
        Self-pace learning interactive labs on <a href="https://killercoda.com/decoder">Killercoda</a>.
        Learn topics like: Kubernetes, service mesh, Crossplane, Docker.
      </>
    ),
  },
  {
    title: 'GitHub Repositories',
    Svg: require('../../static/img/git.svg').default,
    description: (
      <>
        Lots of useful repos on <a href="https://github.com/Piotr1215">GitHub</a>.
        Learning material and tools, for example: Go, REST API, Containers, Kubernetes, Public Cloud.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
