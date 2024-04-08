import plotly.graph_objects as go

import pandas as pd

# Load the data from the CSV file
df = pd.read_csv('Pasta1.csv')

# Extract the data from the relevant columns
x = df['X'].tolist()
y = df['Y'].tolist()
z = df['Z'].tolist()
contagem = df['C'].tolist()


def create_3d_bubble_chart(x, y, z, n_repeticoes):
  """
  Creates a 3D bubble chart with the given data.

  Args:
      x: A list of x-coordinates for the bubbles.
      y: A list of y-coordinates for the bubbles.
      z: A list of z-coordinates for the bubbles.
      n_repeticoes: A list of values representing the number of repetitions for each bubble.

  Returns:
      A plotly figure object containing the 3D bubble chart.
  """

  # Create the trace
  trace = go.Scatter3d(
      x=x,
      y=y,
      z=z,
      mode='markers',
      marker=dict(
          size=n_repeticoes,
          sizemode='diameter',
          color=n_repeticoes,
          colorscale='Viridis'
      )
  )

  # Create the layout
  layout = go.Layout(
      title='3D Bubble Chart',
      scene=dict(
          xaxis=dict(title='X'),
          yaxis=dict(title='Y'),
          zaxis=dict(title='Z')
      )
  )

  # Create the figure
  fig = go.Figure(data=[trace], layout=layout)

  return fig



fig = create_3d_bubble_chart(x, y, z, contagem)

# Show the figure
fig.show(fullscreen=True)
