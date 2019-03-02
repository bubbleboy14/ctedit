from setuptools import setup

setup(
    name='ctedit',
    version="0.1",
    author='Mario Balibrera',
    author_email='mario.balibrera@gmail.com',
    license='MIT License',
    description='Generic site editor plugin for cantools (ct)',
    long_description='This package provides a simple interface (and corresponding models) for generically modifying content on a site without touching code or configuration.',
    packages=[
        'ctedit'
    ],
    zip_safe = False,
    install_requires = [
#        "ct >= 0.9.12.1"
    ],
    entry_points = '''''',
    classifiers = [
        'Development Status :: 3 - Alpha',
        'Environment :: Console',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Topic :: Software Development :: Libraries :: Python Modules'
    ],
)
